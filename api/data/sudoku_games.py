from datetime import datetime
from enum import Enum
from typing import Optional, TypedDict
import boto3
from boto3.dynamodb.conditions import Key
from botocore.exceptions import ClientError

from api.utils.date_time import (
    get_now_datetime,
    get_now_str,
    parse_datetime,
    serialize_datetime,
    safe_parse_datetime
)
from api.utils.logging import logger
from api.config import config

dynamodb = boto3.resource('dynamodb')


class GameSquare(TypedDict):
    x: int
    y: int
    number: Optional[int]
    is_fixed: bool
    notes: list[int]


class GameMoveType(Enum):
    SET_NUMBER = 'SET_NUMBER'
    REMOVE_NUMBER = 'REMOVE_NUMBER'
    ADD_NOTE = 'ADD_NOTE'
    REMOVE_NOTE = 'REMOVE_NOTE'


class GameMove(TypedDict):
    x: int
    y: int
    number: int
    type: GameMoveType
    timestamp: datetime


class Game(TypedDict):
    game_id: str
    user_id: str
    difficulty: int
    board: list[list[GameSquare]]
    moves: list[GameMove]
    finished_at: Optional[datetime]
    created_at: datetime
    updated_at: datetime


def deserialize(data) -> Game:
    raw_board = data.get('board', [])
    board: list[list[GameSquare]] = []

    for y, row in enumerate(raw_board):
        if not isinstance(row, list):
            continue
        if len(board) <= y:
            board.append([])
        for x, raw_square in enumerate(row):
            square: GameSquare = {
                'x': x,
                'y': y,
                'number': raw_square.get('number', None),
                'is_fixed': raw_square.get('is_fixed', False),
                'notes': raw_square.get('notes', []),
            }
            board[y][x] = square

    raw_moves = data.get('moves', [])
    moves: list[GameMove] = []
    for raw_move in raw_moves:
        move: GameMove = {
            'x': raw_move.get('x', 0),
            'y': raw_move.get('y', 0),
            'number': raw_move.get('number', 0),
            'type': GameMoveType(raw_move.get('type', '')),
            'timestamp': parse_datetime(raw_move.get('timestamp', '')),
        }
        moves.append(move)

    game: Game = {
        'game_id': f"{data.get('game_id', '')}",
        'user_id': f"{data.get('user_id', '')}",
        'difficulty': data.get('difficulty', 0),
        'board': board,
        'moves': moves,
        'finished_at': safe_parse_datetime(data.get('finished_at', '')),
        'created_at': parse_datetime(data.get('created_at', '')),
        'updated_at': parse_datetime(data.get('updated_at', '')),
    }
    return game


def serialize(game: Game) -> dict:
    moves = [{**move, 'timestamp': serialize_datetime(
        move['timestamp']), 'type': move['type'].value} for move in game['moves']]
    data = {
        'game_id': game['game_id'],
        'user_id': game['user_id'],
        'difficulty': game['difficulty'],
        'board': game['board'],
        'moves': moves,
        'finished_at': serialize_datetime(game['finished_at']),
        'created_at': serialize_datetime(game['created_at']),
        'updated_at': serialize_datetime(game['updated_at']),
    }

    return data


class GameParams(TypedDict):
    game_id: str
    user_id: str
    board: list[list[GameSquare]]
    difficulty: int


def create(game_params: GameParams):
    """Create a game"""
    table = dynamodb.Table(config.sudoku_games_dynamodb_table)
    game: Game = {
        **game_params,
        'moves': [],
        'finished_at': None,
        'created_at': get_now_datetime(),
        'updated_at': get_now_datetime(),
    }
    try:
        table.put_item(Item=serialize(game))
        return game
    except ClientError as e:
        logger.error(
            f"Failed to add game. Error: {e.response.get('Error', {}).get('Message', '')}")
        return None


def get(game_id: str) -> Optional[Game]:
    """Get a game by game_id"""
    table = dynamodb.Table(config.sudoku_games_dynamodb_table)
    try:
        response = table.get_item(
            Key={'game_id': game_id}
        )
        data = response.get('Item', {})
        return deserialize(data)
    except ClientError as e:
        logger.error(
            f"Failed to get game. Error: {e.response.get('Error', {}).get('Message', '')}")
        return None


def list_by_user_id(user_id: str, limit: int = 25, next_token: Optional[str] = None):
    """List games by user_id"""
    table = dynamodb.Table(config.sudoku_games_dynamodb_table)
    try:
        query_kwargs: dict = {
            'IndexName': 'user_id-index',
            'KeyConditionExpression': Key("user_id").eq(user_id),
            'Limit': limit
        }
        if next_token:
            query_kwargs['ExclusiveStartKey'] = next_token
        response = table.query(**query_kwargs)
        data = response.get('Items', [])
        items = [deserialize(item) for item in data]
        return {
            'items': items,
            'next_token': response.get('LastEvaluatedKey', None)
        }
    except ClientError as e:
        logger.error(
            f"Failed to get chats. Error: {e.response.get('Error', {}).get('Message', '')}")
        return None


def update(game: Game):
    """Update a game"""
    table = dynamodb.Table(config.sudoku_games_dynamodb_table)
    try:

        response = table.put_item(Item={
            **serialize(game),
            "created_at": serialize_datetime(game['created_at']),
            "updated_at": get_now_str(),
        })
        return response
    except ClientError as e:
        logger.error(
            f"Failed to add game. Error: {e.response.get('Error', {}).get('Message', '')}")
        return None


def delete(game_id: str) -> bool:
    """Delete a game"""
    table = dynamodb.Table(config.sudoku_games_dynamodb_table)
    try:
        table.delete_item(
            Key={'game_id': game_id}
        )
        return True
    except ClientError as e:
        logger.error(
            f"Failed to delete game. Error: {e.response.get('Error', {}).get('Message', '')}")
        return False


def is_game_finished(game: Game) -> bool:
    """Check if a game is finished"""
    for row in game['board']:
        for square in row:
            if square['number'] is None:
                return False
    return True


class PlayGameParams(TypedDict):
    game_id: str
    x: int
    y: int
    number: int


def add_note(params: PlayGameParams):
    """Add a note to a square in a game"""
    game = get(params['game_id'])
    if not game:
        raise Exception("Game not found")

    if params['x'] < 0 or params['x'] > 8 or params['y'] < 0 or params['y'] > 8:
        raise Exception("Invalid square")

    square = game['board'][params['y']][params['x']]

    if game['finished_at']:
        raise Exception("Game is already finished")

    if params['number'] < 1 or params['number'] > 9:
        raise Exception("Invalid number")

    if square['is_fixed']:
        raise Exception("Cannot change fixed square")

    if square["number"] is not None:
        raise Exception("Cannot add note to filled square")

    if params['number'] in square['notes']:
        raise Exception("Note already exists")

    square['notes'].append(params['number'])
    game['moves'].append({
        'x': params['x'],
        'y': params['y'],
        'number': params['number'],
        'type': GameMoveType.ADD_NOTE,
        'timestamp': get_now_datetime(),
    })
    return update(game)


def remove_note(params: PlayGameParams):
    """Remove a note from a square in a game"""
    game = get(params['game_id'])
    if not game:
        raise Exception("Game not found")

    if params['x'] < 0 or params['x'] > 8 or params['y'] < 0 or params['y'] > 8:
        raise Exception("Invalid square")

    square = game['board'][params['y']][params['x']]

    if game['finished_at']:
        raise Exception("Game is already finished")

    if params['number'] < 1 or params['number'] > 9:
        raise Exception("Invalid number")

    if square['is_fixed']:
        raise Exception("Cannot change fixed square")

    if square["number"] is not None:
        raise Exception("Cannot remove note from filled square")

    if params['number'] not in square['notes']:
        raise Exception("Note does not exist")

    square['notes'].remove(params['number'])
    game['moves'].append({
        'x': params['x'],
        'y': params['y'],
        'number': params['number'],
        'type': GameMoveType.REMOVE_NOTE,
        'timestamp': get_now_datetime(),
    })
    return update(game)


def set_number(params: PlayGameParams):
    """Set the number of a square in a game"""
    game = get(params['game_id'])
    if not game:
        raise Exception("Game not found")

    if params['x'] < 0 or params['x'] > 8 or params['y'] < 0 or params['y'] > 8:
        raise Exception("Invalid square")

    square = game['board'][params['y']][params['x']]

    if game['finished_at']:
        raise Exception("Game is already finished")

    if params['number'] < 1 or params['number'] > 9:
        raise Exception("Invalid number")

    if square['is_fixed']:
        raise Exception("Cannot change fixed square")

    square['number'] = params['number']
    game['moves'].append({
        'x': params['x'],
        'y': params['y'],
        'number': params['number'],
        'type': GameMoveType.SET_NUMBER,
        'timestamp': get_now_datetime(),
    })

    game_finished = True
    for row in game['board']:
        for square in row:
            if square['number'] is None:
                game_finished = False
                break
        if not game_finished:
            break

    if game_finished:
        game['finished_at'] = get_now_datetime()
    return update(game)


def remove_number(params: PlayGameParams):
    """Remove the number of a square in a game"""
    game = get(params['game_id'])
    if not game:
        raise Exception("Game not found")

    if params['x'] < 0 or params['x'] > 8 or params['y'] < 0 or params['y'] > 8:
        raise Exception("Invalid square")

    square = game['board'][params['y']][params['x']]

    if game['finished_at']:
        raise Exception("Game is already finished")

    if square['is_fixed']:
        raise Exception("Cannot change fixed square")

    square['number'] = None
    game['moves'].append({
        'x': params['x'],
        'y': params['y'],
        'number': 0,
        'type': GameMoveType.REMOVE_NUMBER,
        'timestamp': get_now_datetime(),
    })
    return update(game)


class MakeMoveParams(TypedDict):
    game_id: str
    x: int
    y: int
    number: int
    type: str


def make_move(move: MakeMoveParams):
    move_type = GameMoveType(move['type'])

    if move_type == GameMoveType.SET_NUMBER:
        return set_number({
            'game_id': move['game_id'],
            'x': move['x'],
            'y': move['y'],
            'number': move['number'],
        })
    elif move_type == GameMoveType.REMOVE_NUMBER:
        return remove_number({
            'game_id': move['game_id'],
            'x': move['x'],
            'y': move['y'],
            'number': move['number'],
        })
    elif move_type == GameMoveType.ADD_NOTE:
        return add_note({
            'game_id': move['game_id'],
            'x': move['x'],
            'y': move['y'],
            'number': move['number'],
        })
    elif move_type == GameMoveType.REMOVE_NOTE:
        return remove_note({
            'game_id': move['game_id'],
            'x': move['x'],
            'y': move['y'],
            'number': move['number'],
        })
    else:
        raise Exception("Invalid move type")

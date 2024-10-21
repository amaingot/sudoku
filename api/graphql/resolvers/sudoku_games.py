from typing import List, Optional, TypedDict
from ariadne import convert_kwargs_to_snake_case

from api.graphql.context import ResolverInfo
from api.data import sudoku_games, users
from api.utils.logging import logger
from api.utils import sudoku


@convert_kwargs_to_snake_case
def get_game_id(parent: sudoku_games.Game, info: ResolverInfo):
    logger.info("resolving game id")
    return parent['game_id']


@convert_kwargs_to_snake_case
def get_cell_is_correct(parent: sudoku_games.GameSquare, info: ResolverInfo):
    logger.info("resolving cell is correct")
    if parent['number'] is None or parent["is_fixed"]:
        return None

    return parent["answer"] == parent["number"]


@convert_kwargs_to_snake_case
def get_cell_notes(parent: sudoku_games.GameSquare, info: ResolverInfo):
    logger.info("resolving cell notes")
    if parent["number"] is not None:
        return []

    # Intersection of notes and current_possible_numbers
    valid_notes: List[int] = []
    for note in parent["notes"]:
        if note in parent["current_possible_numbers"]:
            valid_notes.append(note)
    return valid_notes


@convert_kwargs_to_snake_case
def get_game_move_type(parent: sudoku_games.GameMove, info: ResolverInfo):
    logger.info("resolving game move type")
    return parent['type'].value


@convert_kwargs_to_snake_case
def get_game(parent, info: ResolverInfo, **kwargs):
    id: Optional[str] = kwargs.get('id')
    logger.info("getting game id %s", id)

    user_id = info.context.user_id
    if not user_id:
        raise Exception("User not logged in")

    if isinstance(parent, dict) and 'current_sudoku_game_id' in parent and isinstance(parent['current_sudoku_game_id'], str):
        id = parent['current_sudoku_game_id']

    if not id:
        return None

    game = sudoku_games.get(id)

    if not game:
        return None

    if game['user_id'] != user_id and not info.context.is_admin():
        raise Exception("Unauthorized")

    return game


class ListGamesInput(TypedDict):
    limit: Optional[int]
    next_token: Optional[str]


@convert_kwargs_to_snake_case
def list_games(_, info: ResolverInfo, input: Optional[ListGamesInput] = None):
    logger.info("listing games")

    limit: int = input["limit"] or 25 if input else 25
    next_token = input.get('next_token', None) if input else None
    user_id = info.context.user_id
    if not user_id:
        raise Exception("User not logged in")

    games_list = sudoku_games.list_by_user_id(
        user_id=user_id, limit=limit, next_token=next_token)

    return games_list


class CreateGameInput(TypedDict):
    difficulty: int


@convert_kwargs_to_snake_case
def create_game(_, info: ResolverInfo, input: CreateGameInput):
    logger.info("creating game, difficulty %s", input['difficulty'])

    user = info.context.get_user()

    generated_game = sudoku.generate_sudoku(input['difficulty'])

    game = sudoku_games.create({
        **generated_game,
        "user_id": user['user_id'],
    })

    users.update({
        **user,
        "current_sudoku_game_id": game['game_id']
    })

    return game


class MakeGameMoveInput(TypedDict):
    game_id: str
    x: int
    y: int
    number: int
    type: str


@convert_kwargs_to_snake_case
def make_game_move(_, info: ResolverInfo, input: MakeGameMoveInput):
    logger.info("making game move, game id: %s", input['game_id'])
    info.context.assert_user()

    game = sudoku_games.get(input['game_id'])

    if not game:
        raise Exception("Game not found")

    if info.context.user_id != game['user_id'] and not info.context.is_admin():
        raise Exception("Unauthorized")

    new_game = sudoku_games.make_move(input)

    return new_game


@convert_kwargs_to_snake_case
def delete_game(_, info: ResolverInfo, id: str):
    logger.info("deleting game, game id: %s", id)
    info.context.assert_admin()

    game = sudoku_games.get(id)

    if not game:
        raise Exception("Game not found")

    sudoku_games.delete(id)
    return True

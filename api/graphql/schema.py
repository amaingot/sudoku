from ariadne import (
    make_executable_schema,
    snake_case_fallback_resolvers,
    load_schema_from_path,
    ObjectType,
)

from api.graphql.resolvers import (
    ping_pong,
    sign_up,
    sudoku_games,
    users,
)
from api.graphql import scalars

type_defs = load_schema_from_path("api/graphql/type_defs/")

query = ObjectType("Query")
mutation = ObjectType("Mutation")

# Ping / Pong
query.set_field("ping", ping_pong.resolve_ping)
mutation.set_field("pong", ping_pong.resolve_pong)

# Sign Up
mutation.set_field("signUp", sign_up.sign_up)
mutation.set_field("confirmSignUp", sign_up.confirm_sign_up)

# User
user = ObjectType("User")
user.set_field("id", users.get_user_id)
user.set_field("currentSudokuGame", sudoku_games.get_game)
query.set_field("me", users.get_me)
query.set_field("getUser", users.get_user)
query.set_field("listUsers", users.list_users)

# Sudoku Game
sudoku_game = ObjectType("SudokuGame")
sudoku_game.set_field("id", sudoku_games.get_game_id)
sudoku_game.set_field("user", users.get_user)
query.set_field("getSudokuGame", sudoku_games.get_game)
query.set_field("listSudokuGames", sudoku_games.list_games)
mutation.set_field("createSudokuGame", sudoku_games.create_game)
mutation.set_field("deleteSudokuGame", sudoku_games.delete_game)
mutation.set_field("makeSudokuGameMove", sudoku_games.make_game_move)

# Sudoku Game Cell
sudoku_game_cell = ObjectType("SudokuGameCell")
sudoku_game_cell.set_field("isCorrect", sudoku_games.get_cell_is_correct)
sudoku_game_cell.set_field("notes", sudoku_games.get_cell_notes)

# Sudoku Game Move
sudoku_game_move = ObjectType("SudokuGameMove")
sudoku_game_move.set_field("type", sudoku_games.get_game_move_type)

schema = make_executable_schema(
    type_defs,
    [
        scalars.datetime_scalar,
        query,
        mutation,
        user,
        sudoku_game,
        sudoku_game_cell,
        sudoku_game_move,
    ],
    snake_case_fallback_resolvers,
)

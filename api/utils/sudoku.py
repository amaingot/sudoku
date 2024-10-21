import random
from typing import Optional,  List, TypedDict
import uuid


class GameSquare(TypedDict):
    x: int
    y: int
    number: Optional[int]
    is_correct: Optional[bool]
    is_fixed: bool
    notes: List[int]
    current_possible_numbers: List[int]
    answer: int


class SudokuGame(TypedDict):
    game_id: str
    board: List[List[GameSquare]]
    difficulty: int


def create_empty_board() -> List[List[Optional[int]]]:
    """Creates a 9x9 empty board for Sudoku."""
    return [[None for _ in range(9)] for _ in range(9)]


def is_valid(board: List[List[Optional[int]]], row: int, col: int, num: int) -> bool:
    """Check if placing a number is valid in Sudoku."""
    # Check the row
    if num in board[row]:
        return False

    # Check the column
    if num in [board[r][col] for r in range(9)]:
        return False

    # Check the 3x3 grid
    start_row, start_col = 3 * (row // 3), 3 * (col // 3)
    for r in range(start_row, start_row + 3):
        for c in range(start_col, start_col + 3):
            if board[r][c] == num:
                return False

    return True


def solve_board(board: List[List[Optional[int]]]) -> bool:
    """Solve the Sudoku board using backtracking."""
    for row in range(9):
        for col in range(9):
            if board[row][col] is None:
                numbers = list(range(1, 10))
                random.shuffle(numbers)
                for num in numbers:
                    if is_valid(board, row, col, num):
                        board[row][col] = num
                        if solve_board(board):
                            return True
                        board[row][col] = None
                return False
    return True


def verify_not_multiple_solutions(board: List[List[Optional[int]]]) -> bool:
    """Verify that the Sudoku board has only one solution."""
    board_copy = []
    for row in range(9):
        board_copy.append([board[row][col] for col in range(9)])
    return solve_board(board_copy)


def remove_numbers(board: List[List[Optional[int]]], difficulty: int) -> List[List[Optional[int]]]:
    """Remove numbers from the solved Sudoku board based on difficulty."""
    # Difficulty determines how many cells to remove (0.25 to 0.75 of the board)
    cells_to_remove = int(81 * (0.25 + (difficulty / 10) * 0.5))
    removed = 0

    # Copy board to avoid modifying the original
    new_board: List[List[Optional[int]]] = []
    for row in range(9):
        new_board.append([board[row][col] for col in range(9)])

    while removed < cells_to_remove:
        row, col = random.randint(0, 8), random.randint(0, 8)
        if new_board[row][col] is not None:
            old_value = new_board[row][col]
            new_board[row][col] = None

            if not verify_not_multiple_solutions(new_board):
                new_board[row][col] = old_value
            else:
                removed += 1
    return new_board


def update_possible_notes(board: List[List[GameSquare]]):
    """Update the possible notes for each square in the board."""
    for row in range(9):
        for col in range(9):
            if board[row][col]["number"] is not None:
                board[row][col]["current_possible_numbers"] = []
                continue

            possible_numbers = set(range(1, 10))
            for r in range(9):
                number = board[r][col]["number"]
                if number is not None:
                    possible_numbers.discard(number)
            for c in range(9):
                number = board[row][c]["number"]
                if number is not None:
                    possible_numbers.discard(number)
            start_row, start_col = 3 * (row // 3), 3 * (col // 3)
            for r in range(start_row, start_row + 3):
                for c in range(start_col, start_col + 3):
                    number = board[r][c]["number"]
                    if number is not None:
                        possible_numbers.discard(number)

            board[row][col]["current_possible_numbers"] = list(
                possible_numbers)


def generate_sudoku(difficulty: int) -> SudokuGame:
    """Generates a Sudoku puzzle based on the input difficulty."""
    if difficulty < 1 or difficulty > 10:
        raise ValueError("Difficulty must be between 1 and 10.")

    # Step 1: Create and solve a board
    solved_board = create_empty_board()
    solve_board(solved_board)

    # Step 2: Remove numbers based on difficulty level
    board = remove_numbers(solved_board, difficulty)

    # Step 3: Convert to SudokuGameSquare objects
    game_board: List[List[GameSquare]] = []
    for row in range(9):
        game_row: List[GameSquare] = []
        for col in range(9):
            square: GameSquare = {
                "x": row,
                "y": col,
                "number": board[row][col],
                "is_fixed": (board[row][col] is not None),
                "notes": [],
                "is_correct": None,
                "current_possible_numbers": [],
                "answer": solved_board[row][col] or 0,
            }
            game_row.append(square)
        game_board.append(game_row)

    # Step 4: Update possible notes
    update_possible_notes(game_board)

    # Step 5: Return the game
    game: SudokuGame = {
        "game_id": str(uuid.uuid4()),
        "board": game_board,
        "difficulty": difficulty,
    }

    return game

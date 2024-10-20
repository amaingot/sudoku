import random
from typing import Optional, TypedDict, List
import uuid


class SudokuGameSquare(TypedDict):
    x: int
    y: int
    number: Optional[int]
    is_fixed: bool
    notes: List[int]


class SudokuGame(TypedDict):
    game_id: str
    board: List[List[SudokuGameSquare]]


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
                for num in range(1, 10):
                    if is_valid(board, row, col, num):
                        board[row][col] = num
                        if solve_board(board):
                            return True
                        board[row][col] = None
                return False
    return True


def remove_numbers(board: List[List[Optional[int]]], difficulty: int) -> None:
    """Remove numbers from the solved Sudoku board based on difficulty."""
    # Difficulty determines how many cells to remove (0.25 to 0.75 of the board)
    cells_to_remove = int(81 * (0.25 + (difficulty / 10) * 0.5))
    removed = 0

    while removed < cells_to_remove:
        row, col = random.randint(0, 8), random.randint(0, 8)
        if board[row][col] is not None:
            board[row][col] = None
            removed += 1


def generate_sudoku(difficulty: int) -> SudokuGame:
    """Generates a Sudoku puzzle based on the input difficulty."""
    if difficulty < 1 or difficulty > 10:
        raise ValueError("Difficulty must be between 1 and 10.")

    # Step 1: Create and solve a board
    board = create_empty_board()
    solve_board(board)

    # Step 2: Remove numbers based on difficulty level
    remove_numbers(board, difficulty)

    # Step 3: Convert to SudokuGameSquare objects
    game_board: List[List[SudokuGameSquare]] = []
    for row in range(9):
        game_row: List[SudokuGameSquare] = []
        for col in range(9):
            game_row.append(SudokuGameSquare(
                x=row,
                y=col,
                number=board[row][col],
                is_fixed=(board[row][col] is not None),
                notes=[]
            ))
        game_board.append(game_row)

    # Step 4: Return the game
    return SudokuGame(
        game_id=str(uuid.uuid4()),
        board=game_board
    )

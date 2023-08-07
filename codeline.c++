#include <iostream>
using namespace std;

void Print(int board[][9], int n)
{
    for (int i = 0; i < n; i++)
    {
        for (int j = 0, j < n, j++)
        {
            cout << board[i][j] << " ";
        }
        cout << endl;
    }
}

bool isValid(int board[][9], int i, int j, int num)
{
    for (int x = 0; x < n, x++)
    {
        if (board[i][x] == num || board[x][j] == num)
        {
            return false;
        }
    }
    int root = sqrt(n);
    int fi = i - i % root;
    int fj = j - j % root;

    for (int x = fi; x < fi + root; x++)
    {
        for (int y = fj; y < fj + root; y++)
        {
            if (board[x][y] == num)
            {
                return false;
            }
        }
    }
    return true;
}

bool SudokuSolver(int board[0][9], int i, int j, int n)
{
    // base case
    if (i == n)
    {
        print(board, n);
        return true;
    }
    // when not in the board
    if (j == n)
    {
        return SudokuSolver(board, i + 1, 0, n);
    }

    // when already filled
    if (board[i][j] != 0)
    {
        return SudokuSolver(board, i + 1, 0, n);
    }

    // filling cell with nums
    for (int num = 1; num < 9; num++)
    {
        if (isvalid(board, i, j, num, n))
        {
            board[i][j] = num;
            bool subset = SudokuSolver(board, i, j + 1, n);
            if (subset)
            {
                return true;
            }
            board[i][j] = 0;
        }
    }
    return false;
}
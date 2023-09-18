
import {piecesPosition} from "./piece.js";
export const squareSize = 64; // 64
export const squareHalf = squareSize / 16;
export const ssb = squareHalf / 2; // 2
export const board = document.querySelector('.bg');
export const squarePerRow = 8;
export const sqs = [];
export const pieceNodes = document.querySelector('.chs');
export function drawBoardFrame() {
    for (let y = 0; y <= squarePerRow; y++) {
        const row = document.createElement('div');
        row.classList.add('row')
        sqs[y] = row
        for (let x = 0; x < squarePerRow; x++) {
            const sq = document.createElement('div');
            sq.classList.add('sq')
            sqs[y][x] = sq
            row.appendChild(sq)
        }
        board.appendChild(row)
    }
    const rows = document.querySelectorAll('.row');
    rows[4].classList.add('middle')
    sqs[1][4].classList.add('cross')
    sqs[8][4].classList.add('cross')
    const marks = [
        [2, 1], [2, 7],
        [3, 0], [3, 2], [3, 4], [3, 6], [3, 8],
        [6, 0], [6, 2], [6, 4], [6, 6], [6, 8],
        [7, 1], [7, 7]
    ];
    let i;
    for (i = 0; i < marks.length; i++) {
        const mark = document.createElement('div');
        mark.classList.add('mark')
        mark.style.top = (marks[i][0] * squareSize + ssb) + 'px'
        mark.style.left = (marks[i][1] * squareSize + ssb) + 'px'
        board.appendChild(mark)
    }

    for (i = 0; i < piecesPosition.length; i++) {
        placeChess.apply(null, piecesPosition[i].concat(i))
    }
}

export function placeChess(side, name, y, x, i) {
    const piecesNode = document.createElement('span');
    piecesNode.textContent = name
    piecesNode.classList.add('ch', side > 0 ? 'red' : 'green')
    piecesNode.setAttribute('i', i)
    piecesNode.style.top = convertToPixel(y) + 'px'
    piecesNode.style.left = convertToPixel(x) + 'px'
    pieceNodes.appendChild(piecesNode)
}

export function convertToPixel(n) {
    return n * squareSize + ssb
}

export function convertToChessCoord(v) {
    return (v - ssb) / squareSize
}


// 'use strict'
import {board, convertToChessCoord, convertToPixel, pieceNodes, drawBoardFrame} from "./board.js"
import {pieceType, getPieceType, piecesPosition, side} from './piece.js'

drawBoardFrame();

let currentTurn = side.green;
const done = [null, null];
const pick = [null, null];
const chss = pieceNodes.querySelectorAll('.ch');
nextTurn()
document.addEventListener('mousedown', function (e) {
    if (e.target.classList.contains('ch') &&
        e.target.classList.contains(currentTurn === side.red ? 'red' : 'green')) {
        if (pick[currentTurn] != null) {
            chss[pick[currentTurn]].classList.remove('active')
        }
        e.target.classList.add('active')
        pick[currentTurn] = +e.target.getAttribute('i')
        return
    }
    if (pick[currentTurn] != null) {
        let x = convertToChessCoord(e.pageX - board.offsetLeft);
        let y = convertToChessCoord(e.pageY - board.offsetTop);
        if (!(x >= -0.4 && x <= 8.4 &&
            y >= -0.4 && y <= 9.4)) return
        if (Math.abs(Math.round(x) - x) > 0.4 ||
            Math.abs(Math.round(y) - y) > 0.4) return
        x = Math.round(x)
        y = Math.round(y)
        const c = piecesPosition[pick[currentTurn]];
        if (!validMove(c, x, y)) return
        piecesPosition.forEach(function (c, i) {
            if (!c.dead && c[2] === y && c[3] === x) {
                c.dead = true
                chss[i].style.display = 'none'
            }
        })
        const ch = chss[pick[currentTurn]];
        ch.style.left = convertToPixel(x) + 'px'
        ch.style.top = convertToPixel(y) + 'px'
        c[2] = y
        c[3] = x
        if (c[1] === '兵' || c[1] === '卒') {
            if (currentTurn === side.red) {
                if (c[2] >= 5) {
                    c.cross = true
                }
            }
            else  { // currentTurn === side.green
                if (c[2] <= 4) {
                    c.cross = true
                }
            }
        }
        done[currentTurn] = pick[currentTurn]
        if (done[-currentTurn] != null) {
            chss[done[-currentTurn]].classList.remove('active')
        }
        pick[currentTurn] = null
        nextTurn()
    }
})

function validMove(c, x, y) {
    let n;
    let dx = x - c[3]
    let dy = y - c[2]
    const piecesName = getPieceType(c[1])
    switch (piecesName) {
        case pieceType.pawn:
            if (c.cross && dy === 0 && Math.abs(dx) === 1) return true
            return dx === 0 && dy === c[0]
        case pieceType.king:
            if (!(
                c[0] > 0 ? (x >= 3 && x <= 5 && y >= 0 && y <= 2) :
                    (x >= 3 && x <= 5 && y >= 7 && y <= 9)
            )) return false
            return Math.abs(dx) + Math.abs(dy) === 1
        case pieceType.guard:
            if (!(
                c[0] > 0 ? (x >= 3 && x <= 5 && y >= 0 && y <= 2) :
                    (x >= 3 && x <= 5 && y >= 7 && y <= 9)
            )) return false
            return Math.abs(dx) * Math.abs(dy) === 1
        case pieceType.bishop:
            if (!(
                c[0] > 0 ? (x >= 0 && x <= 8 && y >= 0 && y <= 4) :
                    (x >= 0 && x <= 8 && y >= 5 && y <= 9)
            )) return false
            if (piecesPosition.some(function (c1) {
                    return !c1.dead &&
                        c1[2] - c[2] === dy / 2 &&
                        c1[3] - c[3] === dx / 2
                }
            )) return false
            return Math.abs(dx) === 2 && Math.abs(dy) === 2
        case pieceType.knight:
            if (piecesPosition.some(function (c1) {
                    return !c1.dead &&
                        c1[2] - c[2] === sign(dy) * (Math.abs(dy) - 1) &&
                        c1[3] - c[3] === sign(dx) * (Math.abs(dx) - 1)
                }
            )) return false
            return Math.abs(dx) * Math.abs(dy) === 2
        case pieceType.rook:
            if (dx * dy !== 0) return false
            n = piecesPosition.reduce(function (m, c1) {
                    const dx1 = (c1[3] - c[3]) / sign(dx);
                    const dy1 = (c1[2] - c[2]) / sign(dy);
                    const f = c1 !== c && !c1.dead && (
                        (dy && c1[3] === c[3] && dy1 < Math.abs(dy) && dy1 > 0) ||
                        (dx && c1[2] === c[2] && dx1 < Math.abs(dx) && dx1 > 0)
                    );
                    return f ? m + 1 : m
                }
                , 0);
            return n === 0
        case pieceType.cannon:
            if (dx * dy !== 0) return false
            n = piecesPosition.reduce(function (m, c1) {
                    const dx1 = (c1[3] - c[3]) / sign(dx);
                    const dy1 = (c1[2] - c[2]) / sign(dy);
                    const f = c1 !== c && !c1.dead && (
                        (dy && c1[3] === c[3] && dy1 < Math.abs(dy) && dy1 > 0) ||
                        (dx && c1[2] === c[2] && dx1 < Math.abs(dx) && dx1 > 0)
                    );
                    return f ? m + 1 : m
                }
                , 0);
            if (piecesPosition.some(function (c1) {
                    return !c1.dead && c1[2] === y && c1[3] === x
                }
            )) {
                return n === 1
            }
            return n === 0
    }
}

function sign(v) {
    if (v > 0) {
        return 1
    }
    if (v < 0) {
        return -1
    }
    return 0
}

function nextTurn() {
    currentTurn = -currentTurn
}
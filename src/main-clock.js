import createBoard from './createBoard';
const board = createBoard(8, 3, {
    clockSize: 100,
    pointerSize: 8
});
document.body.appendChild(board.el());

const chars = {
    0: [
        0.25, 0.5,
        0.5, 0.75,
        0, 0.5,
        0, 0.5,
        0, 0.25,
        0, 0.75,
    ],
    1: [
        0.625, 0.625,
        0.5, 0.5,
        0.625, 0.625,
        0, 0.5,
        0.625, 0.625,
        0, 0,
    ],
    2: [
        0.25, 0.25,
        0.5, 0.75,
        0.25, 0.5,
        0, 0.75,
        0, 0.25,
        0.75, 0.75,
    ],
    3: [
        0.25, 0.25,
        0.5, 0.75,
        0.25, 0.25,
        0, 0.75,
        0.25, 0.25,
        0, 0.75,
    ],
    4: [
        0.5, 0.5,
        0.5, 0.5,
        0, 0.25,
        0, 0.5,
        0.625, 0.625,
        0, 0,
    ],
    5: [
        0.25, 0.5,
        0.75, 0.75,
        0, 0.25,
        0.5, 0.75,
        0.25, 0.25,
        0, 0.75
    ],
    6: [
        0.25, 0.5,
        0.75, 0.75,
        0, 0.5,
        0.5, 0.75,
        0, 0.25,
        0, 0.75,
    ],
    7: [
        0.25, 0.25,
        0.5, 0.75,
        0.625, 0.625,
        0, 0.5,
        0.625, 0.625,
        0, 0,
    ],
    8: [
        0.25, 0.5,
        0.5, 0.75,
        0, 0.25,
        0, 0.75,
        0, 0.25,
        0, 0.75,
    ],
    9: [
        0.25, 0.5,
        0.5, 0.75,
        0, 0.25,
        0, 0.5,
        0.25, 0.25,
        0, 0.75,
    ]
};

const timeToValue = time => {
    const values = [];
    for (let c = 0, cl = time.length; c < cl; c++) {
        const char = time[c];
        const image = chars[char];

        for (let i = 0, il = image.length; i < il; i++) {
            const index = (c * 4) + i + ((Math.floor(i / 4)) * 12);
            values[index] = image[i];
        }
    }
    return values;
};

let time = 1234;
setInterval(() => {
  board.set(timeToValue(String(time++)));
}, 1000);

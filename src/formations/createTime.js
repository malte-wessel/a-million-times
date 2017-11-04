const symbolChars = {
    0: [
        '┌---┐',
        '|┌-┐|',
        '||,||',
        '||,||',
        '|└-┘|',
        '└---┘'
    ],
    1: [
        ',,┌┐,',
        ',,||,',
        ',,||,',
        ',,||,',
        ',,||,',
        ',,└┘,'
    ],
    2: [
        '┌---┐',
        '└--┐|',
        '┌--┘|',
        '|┌--┘',
        '|└--┐',
        '└---┘'
    ],
    3: [
        '┌---┐',
        '└--┐|',
        '┌--┘|',
        '└--┐|',
        '┌--┘|',
        '└---┘'
    ],
    4: [
        '┌┐,┌┐',
        '||,||',
        '|└-┘|',
        '└--┐|',
        ',,,||',
        ',,,└┘'
    ],
    5: [
        '┌---┐',
        '|┌--┘',
        '|└--┐',
        '└--┐|',
        '┌--┘|',
        '└---┘'
    ],
    6: [
        '┌┐,,,',
        '||,,,',
        '|└--┐',
        '|┌-┐|',
        '|└-┘|',
        '└---┘'
    ],
    7: [
        '┌--┐,',
        '└-┐|,',
        ',,||,',
        ',,||,',
        ',,||,',
        ',,└┘,'
    ],
    8: [
        '┌---┐',
        '|┌-┐|',
        '|└-┘|',
        '|┌-┐|',
        '|└-┘|',
        '└---┘'
    ],
    9: [
        '┌---┐',
        '|┌-┐|',
        '|└-┘|',
        '└--┐|',
        ',,,||',
        ',,,└┘'
    ],
    ':': [
        ',,',
        '┌┐',
        '└┘',
        '┌┐',
        '└┘',
        ',,',
    ]
};

const symbolMap = {
    '┌': [0, 0.25],
    '┐': [0.25, 0.5],
    '└': [0, 0.75],
    '┘': [0.5, 0.75],
    '-': [0, 0.5],
    '|': [0.25, 0.75],
    ',': [0.375, 0.375]
};

const CHAR_HEIGHT = 6;
const FILL_CHAR = ',';
const FILL_VALUE = symbolMap[FILL_CHAR];

const valueChars = {};
for (const char in symbolChars) {
    valueChars[char] = new Array(CHAR_HEIGHT);
    const symbols = symbolChars[char];
    for (let y = 0; y < symbols.length; y++) {
        const row = symbols[y];
        valueChars[char][y] = new Array(row.length);
        for (let x = 0; x < row.length; x++) {
            const symbol = row[x];
            valueChars[char][y][x] = symbolMap[symbol];
        }
    }
}

const getCharWidth = char => valueChars[char][0].length;

const getPictureWidth = str => {
    let width = 0;
    for (let i = 0, l = str.length; i < l; i++) {
        const char = str[i];
        width += getCharWidth(char);
    }
    return width;
};

const createPicture = (str, columns, rows) => {
    const pictureWidth = getPictureWidth(str);
    let offsetX = Math.floor((columns - pictureWidth) / 2);
    let offsetY = Math.floor((rows - CHAR_HEIGHT) / 2);

    const picture = new Array(rows);
    for (let i = 0; i < rows; i++) {
        picture[i] = new Array(columns);
    }

    for (let i = 0, l = str.length; i < l; i++) {
        const char = str[i];
        const values = valueChars[char];
        const width = getCharWidth(char);
        for (let y = 0; y < CHAR_HEIGHT; y++) {
            for (let x = 0; x < width; x++) {
                picture[offsetY + y][offsetX + x] = values[y][x];
            }
        }
        offsetX += width;
    }
    return picture;
};


const createTime = (columns, rows) => {
    const formation = new Array(rows * columns * 2);
    const time = new Date().toTimeString().slice(0, 5);
    const picture = createPicture(time, columns, rows);
    let index = 0;
    for (let y = 0, yl = picture.length; y < yl; y++) {
        const row = picture[y];
        for (let x = 0, xl = row.length; x < xl; x++) {
            const values = row[x] || FILL_VALUE;
            formation[index++] = values[0];
            formation[index++] = values[1];
        }
    }
    return formation;
};

export default createTime;

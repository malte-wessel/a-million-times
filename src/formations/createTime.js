const chars = {
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

const charHeight = 6;
const charWidth = 5;
const timeWidth = charWidth * 4;
const timeHeight = charHeight;
const fillChar = ',';

const getCharValues = char => {
    const rows = chars[char];
    const values = new Float32Array(charHeight * charWidth * 2);
    let index = 0;
    for (let i = 0, il = rows.length; i < il; i++) {
        const row = rows[i];
        for (let j = 0, jl = row.length; j < jl; j++) {
            const symbol = row[j];
            const [value1, value2] = symbolMap[symbol];
            values[index++] = value1;
            values[index++] = value2;
        }
    }
    return values;
};

const createTime = (columns, rows) => {
    const timeString = new Date().toTimeString();
    const numbers = [timeString[0], timeString[1], timeString[3], timeString[4]];

    const numberValues = new Float32Array(timeWidth * timeHeight * 2);
    for (let i = 0, il = numbers.length; i < il; i++) {
        const number = numbers[i];
        const charValues = getCharValues(number);
        for (let j = 0, jl = charValues.length; j < jl; j++) {
            const row = Math.floor(j/(charWidth*2));
            const rowOffset = (row * charWidth * numbers.length * 2);
            const columnOffset = (i * charWidth * 2);
            const charOffset = (row * charWidth * 2);
            const index = rowOffset + columnOffset + j - charOffset;
            numberValues[index] = charValues[j];
        }
    }

    return numberValues;
};

export default createTime;

import createBoard from './createBoard';
import createDebugger from './createDebugger';

const createRenderer = (root, options = {}) => {
    const {
        columns,
        rows,
        clockSize,
        pointerSize,
        debug,
        debugTarget,
        backgroundColor,
        clockColorStopTop,
        clockColorStopBottom,
        pointerColor,
        debugColor,
        debugColor2,
        debugColorText
    } = options;

    root.style.backgroundColor = backgroundColor;

    const board = createBoard(columns, rows, {
        clockSize,
        pointerSize,
        clockColorStopTop,
        clockColorStopBottom,
        pointerColor,
        debug,
        debugColor,
        debugColor2
    });

    root.appendChild(board.el());

    let debugBoard;
    if (debug) {
        debugBoard = createDebugger(columns, rows, {
            clockSize,
            pointerSize,
            debugColor,
            debugColor2,
            debugColorText
        });
        root.appendChild(debugBoard.el());
    }

    return function render(values, velocities) {
        board.set(values);
        if (debug) {
            const target = debugTarget === 'values' ? values : velocities;
            debugBoard.set(target);
        }
    };
};

export default createRenderer;

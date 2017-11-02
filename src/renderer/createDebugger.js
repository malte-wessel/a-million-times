import { h } from '../util/dom';

const createDebugger = (n, m, options = {}) => {
    const {
        clockSize,
        pointerSize,
        debugColor,
        debugColor2,
        debugColorText
    } = options;

    const width = n * clockSize + (n - 1) * pointerSize;
    const height = m * clockSize + (m - 1) * pointerSize;

    const elements = new Array(n * m * 2);

    let index = 0;
    for (let y = 0; y < m; y++) {
        for (let x = 0; x < n; x++) {
            const x1 = x * (clockSize + pointerSize);
            const y1 = y * (clockSize + pointerSize) + clockSize - 10;
            const value1El = h('div', {
                style: {
                    padding: '2px 2px',
                    boxSizing: 'border-box',
                    background: debugColor,
                    fontSize: '8px',
                    lineHeight: '8px',
                    fontWeight: 'bold',
                    fontFamily: 'sans-serif',
                    color: debugColorText,
                    overflow: 'hidden',
                    position: 'absolute',
                    left: `${x1}px`,
                    top: `${y1}px`,
                    width: `${clockSize}px`,
                    height: '10px'
                }
            });
            const value2El = h('div', {
                style: {
                    padding: '2px 2px',
                    boxSizing: 'border-box',
                    background: debugColor2,
                    fontSize: '8px',
                    lineHeight: '8px',
                    fontWeight: 'bold',
                    fontFamily: 'sans-serif',
                    color: debugColorText,
                    overflow: 'hidden',
                    position: 'absolute',
                    left: `${x1}px`,
                    top: `${y1 + 10}px`,
                    width: `${clockSize}px`,
                    height: '10px'
                }
            });

            elements[index++] = value1El;
            elements[index++] = value2El;
        }
    }

    const el = h(
        'div', {
            style: {
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: `${width}px`,
                height: `${height}px`,
                transform: `translate(-50%, -50%)`
            }
        },
        ...elements
    );

    const render = values => {
        let index = 0;
        for (let y = 0; y < m; y++) {
            for (let x = 0; x < n; x++) {
                const value1El = elements[index];
                const value2El = elements[index + 1];
                const value1 = values[index++];
                const value2 = values[index++];
                value1El.textContent = value1;
                value2El.textContent = value2;
            }
        }
    };

    return {
        el: () => el,
        set: values => render(values)
    };
};

export default createDebugger;

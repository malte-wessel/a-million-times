import { h } from './util/dom';
import createCanvas from './util/createCanvas';

const TWO_PI = Math.PI * 2;

const renderBackground = (ctx, n, m, clockSize, pointerSize) => {
    const radius = clockSize / 2;
    for (let x = 0; x < n; x++) {
        for (let y = 0; y < m; y++) {
            const cx = radius + x * (clockSize + pointerSize);
            const cy = radius + y * (clockSize + pointerSize);

            const gx = x * (clockSize + pointerSize);
            const gy = y * (clockSize + pointerSize);
            const gradient = ctx.createLinearGradient(
                gx + radius,
                gy,
                gx + radius,
                gy + clockSize
            );

            gradient.addColorStop(0, '#eee');
            gradient.addColorStop(1, '#fff');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, TWO_PI, true);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = 'black';
            ctx.beginPath();
            ctx.arc(cx, cy, pointerSize / 2, 0, TWO_PI, true);
            ctx.closePath();
            ctx.fill();
        }
    }
};

const renderPointer = (ctx, x1, y1, x2, y2, size) => {
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = size;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
};

const renderForeground = (ctx, values, n, m, clockSize, pointerSize) => {
    let valuesIndex = 0;
    const radius = clockSize / 2;
    for (let x = 0; x < n; x++) {
        for (let y = 0; y < m; y++) {
            const x1 = x * (clockSize + pointerSize) + radius;
            const y1 = y * (clockSize + pointerSize) + radius;

            const v1 = values[valuesIndex++];
            const theta1 = v1 * TWO_PI;
            const x2 = x1 + (radius) * Math.cos(theta1);
            const y2 = y1 + (radius) * Math.sin(theta1);

            const v2 = values[valuesIndex++];
            const theta2 = v2 * TWO_PI;
            const x3 = x1 + (radius) * Math.cos(theta2);
            const y3 = y1 + (radius) * Math.sin(theta2);

            renderPointer(ctx, x1, y1, x2, y2, pointerSize);
            renderPointer(ctx, x1, y1, x3, y3, pointerSize);
        }
    }
};

const createBoard = (n, m, options = {}) => {
    const { clockSize = 50, pointerSize = 4 } = options;

    const width = n * clockSize + (n - 1) * pointerSize;
    const height = m * clockSize + (m - 1) * pointerSize;

    const background = createCanvas(width, height);
    const backgroundCtx = background.getContext('2d');

    const foreground = createCanvas(width, height);
    const foregroundCtx = foreground.getContext('2d');

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
        background,
        foreground
    );

    renderBackground(backgroundCtx, n, m, clockSize, pointerSize);

    return {
        el: () => el,
        set: values => {
            foregroundCtx.clearRect(0, 0, width, height);
            renderForeground(
                foregroundCtx,
                values,
                n,
                m,
                clockSize,
                pointerSize
            );
        }
    };
};

export default createBoard;

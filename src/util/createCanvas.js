import { h, setAttributes } from './dom';
const dpr = window.devicePixelRatio || 1;

const getBackingStorePixelRatio = context =>
    context.webkitBackingStorePixelRatio
        || context.mozBackingStorePixelRatio
        || context.msBackingStorePixelRatio
        || context.oBackingStorePixelRatio
        || context.backingStorePixelRatio
        || 1;

export default function createCanvas(width, height, x = 0, y = 0) {
    const canvas = h('canvas', {
        width: width,
        height: height,
        style: {
            position: 'absolute',
            left: x + 'px',
            top: y + 'px',
            width: width + 'px',
            height: height + 'px'
        }
    });

    const context = canvas.getContext('2d');
    const bsr = getBackingStorePixelRatio(context);
    const ratio = dpr / bsr;

    if (ratio !== 1) {
        setAttributes(canvas, {
            width: width * ratio,
            height: height * ratio,
        });
        context.scale(ratio, ratio);
    }

    return canvas;
}

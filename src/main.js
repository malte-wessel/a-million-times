import createBoard from './createBoard';

import createMagnet from './formations/createMagnet';
import createLines from './formations/createLines';

import createVelocityWave from './runners/createVelocityWave';
import createVelocityWave2 from './runners/createVelocityWave2';
import createStopAtFormation from './runners/createStopAtFormation';
import createMoveToFormation from './runners/createMoveToFormation';
import createDelay from './runners/createDelay';

const w = 21;
const h = 11;

const board = createBoard(w, h, { clockSize: 50 });

document.body.appendChild(board.el());
document.body.style.backgroundColor = '#f7f7f7';

const createVelocities = (w, h) => {
    const values = new Float32Array(w * h * 2);
    values.fill(0);
    return values;
};

let values = createMagnet(w, h, true)
let velocities = createVelocities(w, h);


const fns = [
    createDelay(2000),
    createMoveToFormation(
        createMagnet(w, h, true)
    ),
    createVelocityWave2(w, h),
    createDelay(10000),
    createStopAtFormation(
        createLines(w, h, -1/8)
    ),
    createDelay(2000),
    createMoveToFormation(
        createMagnet(w, h, true)
    ),
    createVelocityWave(),
    createStopAtFormation(
        createLines(w, h, -1/8)
    )
];

let fn = fns.shift();

let startedAt = Date.now();
let t;

const loop = () => {
    let index = 0;

    for (let x = 0; x < w; x++) {
        t = Date.now() - startedAt;
        for (let y = 0; y < h; y++) {

            const value1 = values[index];
            const value2 = values[index + 1];

            let v1 = velocities[index];
            let v2 = velocities[index + 1];

            let result = fn(x, y, index, value1, value2, v1, v2, t);
            if (!result) {
                fn = fns.shift();
                if (!fn) {
                    console.log('The end.');
                    return;
                }
                startedAt = Date.now();
                t = 0;
                result = fn(x, y, index, value1, value2, v1, v2, t);
            }

            [v1, v2] = result;

            const value1Next = value1 + v1;
            const value2Next = value2 + v2;

            values[index] = value1Next;
            values[index + 1] = value2Next;

            velocities[index] = v1;
            velocities[index + 1] = v2;

            index += 2;
        }
    }

    board.set(values);
    requestAnimationFrame(loop);
};


requestAnimationFrame(loop);

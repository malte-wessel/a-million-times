import createApp from './createApp';
import createVelocities from './util/createVelocities';

import createMagnet from './formations/createMagnet';
import createLines from './formations/createLines';
import createTime from './formations/createTime';

import createVelocityWave2 from './runners/createVelocityWave2';
import createStopAtFormation from './runners/createStopAtFormation';
import createMoveToFormation from './runners/createMoveToFormation';
import createSimplexNoise from './runners/createSimplexNoise';
import createDelay from './runners/createDelay';

const columns = 24;
const rows = 12;
const debug = false;
const debugTarget = 'values';

const velocities = createVelocities(columns, rows);
const values = createTime(columns, rows);

const runners = [
    createDelay(2000),
    createSimplexNoise(columns, rows),
    createStopAtFormation(
        createMagnet(columns, rows)
    ),
    createVelocityWave2(columns, rows),
    createStopAtFormation(
        () => createTime(columns, rows)
    ),
    createDelay(2000),
    createMoveToFormation(
        createLines(columns, rows, 1/8)
    ),
    createDelay(2000),
    createMoveToFormation(
        createLines(columns, rows, -1/8)
    ),
];

const root = document.querySelector('.clock');

createApp(root, {
    columns,
    rows,
    velocities,
    values,
    runners,
    debug,
    debugTarget
});

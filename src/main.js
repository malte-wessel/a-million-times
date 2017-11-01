import createApp from './createApp';
import createVelocities from './util/createVelocities';

import createMagnet from './formations/createMagnet';
import createLines from './formations/createLines';

import createVelocityWave from './runners/createVelocityWave';
import createVelocityWave2 from './runners/createVelocityWave2';
import createStopAtFormation from './runners/createStopAtFormation';
import createMoveToFormation from './runners/createMoveToFormation';
import createDelay from './runners/createDelay';

const columns = 1;
const rows = 1;
const debug = true;
const debugTarget = 'values';

const values = createLines(columns, rows, 1/8);
const velocities = createVelocities(columns, rows);

const runners = [
    createDelay(2000),
    // createMoveToFormation(
    //     createMagnet(columns, rows, true)
    // ),
    createVelocityWave2(columns, rows),
    createStopAtFormation(
        createMagnet(columns, rows, true)
    ),
    createVelocityWave2(columns, rows),
    createDelay(5000),
    createStopAtFormation(
        createLines(columns, rows, -1/8)
    ),
    createDelay(2000),
    createMoveToFormation(
        createLines(columns, rows, 1/8)
    )
];

createApp(document.body, {
    columns,
    rows,
    velocities,
    values,
    runners,
    debug,
    debugTarget
});

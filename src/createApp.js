import defaultCreateRenderer from './renderer/createRenderer';

const createApp = (root, options = {}) => {
    const {
        columns = 10,
        rows = 10,
        runners = [],
        clockSize = 50,
        pointerSize = 4,
        velocities = [],
        values = [],
        debug = false,
        debugTarget = 'values',
        backgroundColor = '#f7f7f7',
        clockColorStopTop = '#eee',
        clockColorStopBottom = '#fff',
        pointerColor = '#000',
        debugColor = '#000',
        debugColor2 = '#0289bd',
        debugColorText = '#fff',
        createRenderer = defaultCreateRenderer
    } = options;

    const render = createRenderer(root, {
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
    });

    window.getValues = () => values.toString();
    window.getVelocities = () => velocities.toString();
    window.getState = () => `const values = [${values.toString()}];\nconst velocities = [${velocities.toString()}]`;


    let runnerIndex = 0;
    let update;
    let t;
    let startedAt;

    const next = () => {
        if (runnerIndex === runners.length) runnerIndex = 0;
        console.log(`Initialized runner with idx ${runnerIndex}`);
        const init = runners[runnerIndex++];
        update = init();
        startedAt = Date.now();
        t = 0;
    };

    next();

    const loop = () => {
        let index = 0;
        let noResultsCount = 0;

        t = Date.now() - startedAt;

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < columns; x++) {

                const value1 = values[index] || 0;
                const value2 = values[index + 1] || 0;

                let v1 = velocities[index] || 0;
                let v2 = velocities[index + 1] || 0;

                const result = update(x, y, index, value1, value2, v1, v2, t);
                if (result) {
                    [v1, v2] = result;
                } else {
                    noResultsCount++;
                }

                v1 = v1 || 0;
                v2 = v2 || 0;

                const value1Next = value1 + v1;
                const value2Next = value2 + v2;

                values[index] = value1Next;
                values[index + 1] = value2Next;

                velocities[index] = v1;
                velocities[index + 1] = v2;

                index += 2;
            }
        }

        if (noResultsCount === rows * columns) {
            next();
        }

        render(values, velocities);
        requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
};

export default createApp;

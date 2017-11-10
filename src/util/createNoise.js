import SimplexNoise from 'simplex-noise';
import ndarray from 'ndarray';
import interp from 'ndarray-linear-interpolate';

const createNoise = (w, h, s = 1) => {
    const width = Math.round(w * s);
    const height = Math.round(h * s);
    const simplex = new SimplexNoise();
    let lastTime;
    let lastNoise;

    const getNoiseAtTime = time => {
        const noise = ndarray(new Float32Array(width * height), [width, height]);
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const v = simplex.noise3D(x, y, time);
                noise.set(x, y, v);
            }
        }
        return noise;
    };

    return (time, x, y) => {
        if (time !== lastTime) {
            lastNoise = getNoiseAtTime(time);
            lastTime = time;
        }
        const nx = (width - 1) / w * x;
        const ny = (height - 1) / h * y;
        return interp(lastNoise, nx, ny);
    };
};

export default createNoise;

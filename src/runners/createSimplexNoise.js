import createNoise from '../util/createNoise';

const ACCELERATION = 0.00002;
const FINAL_VELOCITY = 0.002;

export default function createVelocityWave2(columns, rows) {
    const noise = createNoise(columns, rows, 0.12);
    return function init() {
        return function update(x, y, index, hand, value, velocity, t) {
            if (t > 10000) {
                if (Math.abs(velocity) === FINAL_VELOCITY) return false;
                if (Math.abs(velocity) < FINAL_VELOCITY) {
                    return velocity > 0
                        ? velocity + ACCELERATION
                        : velocity - ACCELERATION;
                } else {
                    return velocity > 0
                        ? FINAL_VELOCITY
                        : -FINAL_VELOCITY;
                }
            }
            const time = hand ? t : t;
            const finalVelocity = noise(time / 10000, x, y);
            const a = Math.min(1, t / 500000);
            return a * (finalVelocity - (value) + hand * 0.5);
        };
    };
}

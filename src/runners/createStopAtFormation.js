import normalize from '../util/normalize';
import result from '../util/result';

const DECCELERATE_AFTER = 0.2;
const STOP_AFTER = 0.001;
const FACTOR = 0.5;

const deccelerate = (value, to, v) => {
    if (value === to) return 0;
    let d = normalize(value < to ? to - value : value - to);
    if (value < to && v < 0 || value > to && v > 0) d = 1 - d;
    if (d < STOP_AFTER) return to - value;
    if (d < DECCELERATE_AFTER) {
        const c = v / (d / v) * FACTOR;
        return v > 0 ? v - c : v + c;
    }
    return v;
};

export default function createStopAtFormation(createFormation) {
    return function init() {
        const formation = result(createFormation);
        return function update(x, y, index, hand, value, velocity) {
            if (velocity === 0) {
                return false;
            }
            const to = formation[index];
            return deccelerate(value, to, velocity);
        };
    };
}

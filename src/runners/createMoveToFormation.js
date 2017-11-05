import normalize from '../util/normalize';
import result from '../util/result';

const moveTo = (value, to, t) => {
    let d = normalize(to - value);
    if (d === 0) return 0;
    if (d < 0) d = 1 + d;
    if (Math.abs(d) > 0.001) {
        return d / 100 * (t / 2000);
    }
    return d;
};

export default function createMoveToFormation(createFormation) {
    return function init() {
        const formation = result(createFormation);
        return function update(x, y, index, hand, value, velocity, t) {
            if (velocity === 0 && t > 2000) {
                return false;
            }
            const to = formation[index];
            return moveTo(value, to, t);
        };
    };
}

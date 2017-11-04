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
        return function update(x, y, index, value1, value2, v1, v2, t) {
            if (v1 === 0 && v2 === 0 && t > 2000) {
                return false;
            }

            const to1 = formation[index];
            const to2 = formation[index + 1];

            v1 = moveTo(value1, to1, t);
            v2 = moveTo(value2, to2, t);

            return [v1, v2];
        };
    };
}

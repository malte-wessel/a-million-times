import distance from '../util/distance';

export default formation => {
    let vacc = null;
    return (x, y, index, value1, value2, v1, v2, t) => {
        if (x === 0 && y === 0) {
            if (vacc === 0) return;
            else vacc = 0;
        }

        const to1 = formation[index];
        const to2 = formation[index + 1];

        const d1 = v1 < 0 ? 1 - distance(value1, to1) : distance(value1, to1);
        const d2 = v2 < 0 ? 1 - distance(value2, to2) : distance(value2, to2);

        if (d1 > 0.001) {
            if (d1 < 0.3) {
                v1 -= (v1 / (d1 * 2 / v1)) * (v1 < 0 ? -1 : 1);
            }
        } else {
            v1 = 0;
        }
        if (d2 > 0.001) {
            if (d2 < 0.3) {
                v2 -= (v2 / (d2 * 2 / v2)) * (v2 < 0 ? -1 : 1);
            }
        }  else {
            v2 = 0;
        }

        vacc += v1 + v2;
        return [v1, v2];
    };
};

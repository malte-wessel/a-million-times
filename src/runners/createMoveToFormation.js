import distance from '../util/distance';
export default formation => {
    let vacc = null;
    return (x, y, index, value1, value2, v1, v2, t) => {
        if (x === 0 && y === 0) {
            if (vacc === 0 && t > 2000) return;
            else vacc = 0;
        }

        const to1 = formation[index];
        const to2 = formation[index + 1];

        const d1 = distance(value1, to1);
        const d2 = distance(value2, to2);

        if (d1 > 0.001) {
            v1 = d1 / 100 * (t/2000);
        } else {
            v1 = 0;
        }

        if (d2 > 0.001) {
            v2 = d2 / 100 * (t/2000);
        } else {
            v2 = 0;
        }

        vacc += v1 + v2;
        return [v1, v2];
    };
};

const euclideanDistance = (x1 = 0, y1 = 0, x2 = 0, y2 = 0) =>
    Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));

export default function createVelocityWave2(columns, rows) {
    const cx = Math.floor(columns / 2);
    const cy = Math.floor(rows / 2);
    const maxD = euclideanDistance(0, 0, cx, cy);
    return function init() {
        return function update(x, y, index, value1, value2, v1, v2, t) {
            const vto1 = 0.002;
            const vto2 = -0.002;

            const a1 = 0.00002;
            const a2 = -0.00002;

            const d = euclideanDistance(x, y, cx, cy);

            if (t > d * 1000) {
                if (v1 < vto1) v1 += a1;
                else v1 = vto1;
                if (v2 > vto2) v2 += a2;
                else v2 = vto2;
            }

            if (t > maxD * 1000 * 1.5) {
                return false;
            }

            return [v1, v2];
        };
    };
}

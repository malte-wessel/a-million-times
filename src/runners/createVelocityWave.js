export default function createVelocityWave() {
    return function init() {
        return function update(x, y, index, value1, value2, v1, v2) {
            const vto1 = 0.002;
            const vto2 = 0.001;

            v1 = v1 < vto1 ? v1 + vto1 / (y + 1) / 100 : vto1;
            v2 = v2 < vto2 ? v2 + vto2 / (y + 1) / 100 : vto2;

            if (vto1 === v1 && vto2 === v2) {
                return false;
            }

            return [v1, v2];
        };
    };
}

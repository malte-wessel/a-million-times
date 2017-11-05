const euclideanDistance = (x1 = 0, y1 = 0, x2 = 0, y2 = 0) =>
    Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));

const velocityByHand = [
    0.002,
    -0.002
];

const accelerationByHand = [
    0.00002,
    -0.00002
];

export default function createVelocityWave2(columns, rows) {
    const cx = Math.floor(columns / 2);
    const cy = Math.floor(rows / 2);
    const maxD = euclideanDistance(0, 0, cx, cy);
    return function init() {
        return function update(x, y, index, hand, value, velocity, t) {
            const vto = velocityByHand[hand];
            const a = accelerationByHand[hand];
            const d = euclideanDistance(x, y, cx, cy);

            if (t > d * 1000) {
                if (Math.abs(velocity) < Math.abs(vto)) velocity += a;
                else velocity = vto;
            }

            if (t > maxD * 1000 * 1.5) {
                return false;
            }

            return velocity;
        };
    };
}

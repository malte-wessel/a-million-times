const velocityByHand = [0.002, 0.001];

export default function createVelocityWave() {
    return function init() {
        return function update(x, y, index, hand, value, velocity) {
            const to = velocityByHand[hand];
            velocity = velocity < to ? velocity + to / (y + 1) / 100 : to;
            if (to === velocity) {
                return false;
            }
            return velocity;
        };
    };
}

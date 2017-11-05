export default function createDelay(delay) {
    return function init() {
        return function update(x, y, index, hand, value, velocity, t) {
            if (t >= delay) return;
            return velocity;
        };
    };
}

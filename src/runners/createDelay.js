export default function createDelay(delay) {
    return function init() {
        return function update(x, y, index, value1, value2, v1, v2, t) {
            if (t >= delay) return;
            return [v1, v2];
        };
    };
}

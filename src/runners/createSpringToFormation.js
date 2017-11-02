import result from '../util/result';

const k = -0.5; // Spring stiffness, in kg / s^2
const b = -150; // Damping constant, in kg / s
const mass = 1;

export default function createSpringToFormation(createFormation) {
    return function init() {
        const formation = result(createFormation);
        return function update(x, y, index, value1, value2, v1, v2) {
            const to1 = formation[index];
            const to2 = formation[index + 1];

            const distance1 = value1 - to1;
            const spring1 = k * distance1;
            const damper1 = b * v1;
            const a1 = (spring1 + damper1) / mass;
            v1 += a1 / 10000;

            const distance2 = value2 - to2;
            const spring2 = k * distance2;
            const damper2 = b * v2;
            const a2 = (spring2 + damper2) / mass;
            v2 += a2 / 10000;

            const activity =
                Math.abs(distance1) +
                Math.abs(distance2) +
                Math.abs(v1) +
                Math.abs(v2);

            if (activity < 0.05) {
                return false;
            }

            return [v1, v2];
        };
    };
}

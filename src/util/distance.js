import normalize from './normalize';
export default (alpha, beta) => {
    let a = normalize(alpha);
    let b = normalize(beta);
    let r = b > a ? b - a : 1 - a + b;
    return r < 0 ? 1 + r : r;
};

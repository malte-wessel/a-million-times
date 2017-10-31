export default (alpha, beta) => {
    let a = ((alpha * 360) % 360) / 360;
    let b = ((beta * 360) % 360) / 360;
    let r = b > a ? b - a : 1 - a + b;
    return r < 0 ? 1 + r : r;
};

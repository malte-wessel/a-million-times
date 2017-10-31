export default delay => {
    return (x, y, index, value1, value2, v1, v2, t) => {
        if (t >= delay) return;
        return [v1, v2];
    };
};

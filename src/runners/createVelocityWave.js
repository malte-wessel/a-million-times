export default () => {
    let dacc = null;
    return (x, y, index, value1, value2, v1, v2, t) => {
        if (x === 0 && y === 0) {
            if (dacc === 0) return;
            else dacc = 0;
        }
        const vto1 = 0.002;
        const vto2 = 0.001;

        v1 = v1 < vto1 ? v1 + vto1/(y + 1)/100 : vto1;
        v2 = v2 < vto2 ? v2 + vto2/(y + 1)/100 : vto2;

        dacc += (vto1 - v1) + (vto2 - v2);

        return [
            v1, v2
        ];
    };
};

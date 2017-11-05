export default (w, h) => {
    const cx = Math.floor(w / 2);
    const cy = Math.floor(h / 2);
    const values = new Array(w * h * 2);
    let index = 0;
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const value = Math.atan2(cy - y, cx - x) / Math.PI / 2 + 0.25;
            const value2 = value + 0.5;

            values[index] = value;
            values[index + 1] = value2;

            index += 2;
        }
    }
    return values;
};

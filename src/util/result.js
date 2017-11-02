const result = fn => typeof fn === 'function' ? fn() : fn;

export default result;

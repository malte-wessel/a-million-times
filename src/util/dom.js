export const setStyles = (el, styles) => {
    const { style } = el;
    for (let prop in styles) {
        style[prop] = styles[prop];
    }
    return el;
};

const properties = ['className', 'innerHTML'];
const isProperty = (attr, value) => {
    const type = typeof value;
    return (
        type === 'object' ||
        type === 'function' ||
        properties.indexOf(attr) > -1
    );
};

export const setAttributes = (el, attributes) => {
    for (let attr in attributes) {
        const value = attributes[attr];
        if (attr === 'ref') {
            value(el);
            continue;
        }
        if (attr === 'style' && typeof value !== 'string') {
            setStyles(el, value);
            continue;
        }
        if (isProperty(attr, value)) {
            el[attr] = value;
            continue;
        }
        if (value === null) {
            el.removeAttribute(attr);
            continue;
        }
        el.setAttribute(attr, value);
    }
    return el;
};

export const h = (type, props, ...children) => {
    if (typeof type === 'function') {
        props.children = children;
        return type(props);
    }
    const el = document.createElement(type);
    if (props) setAttributes(el, props);
    for (let i = 0, l = children.length; i < l; i++) {
        let child = children[i];
        if (typeof child === 'string') {
            child = document.createTextNode(child);
        }
        el.appendChild(child);
    }
    return el;
};

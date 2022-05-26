export const searchTypes = {
    TRANSACTIONS: 0,
    BLOCKS: 1,
    DATASTORES: 2,
};

/**
 * Conditionally joins classNames together
 * @param classNames - an object per class name
 */
export const classNames = (...classNames) => {
    let classes = [];

    classNames.forEach(className => {
        if (!className) {
            return;
        }

        const classNameType = typeof className;
        if (classNameType === 'string') {
            classes.push(className);
        } else if (classNameType === 'object') {
            for (const key in className) {
                if (className[key]) {
                    classes.push(key)
                }
            }
        }
    })

    return classes.join(' ');
};

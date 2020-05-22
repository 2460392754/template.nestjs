/**
 * 给对象添加迭代器，遍历获取对象的value
 * @param obj es6 module导入的对象
 */
export const addIterator = function(obj: any) {
    obj[Symbol.iterator] = function() {
        const keys = Object.keys(this);
        let i = 0;

        return {
            next: () => {
                return {
                    value: this[keys[i++]],
                    done: i > keys.length,
                };
            },
        };
    };
};

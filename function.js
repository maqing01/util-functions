/**
 * NO.1
 * isStatic
 * 判断数据是否为ES5原始数据 —— 除了symbol
 */
function isStatic(value) {
    const type = typeof value;
    return type === 'string' || type === 'number' || type === 'boolean' || type === 'undefined' || value === null;
}
/**
 * NO.2
 * isPrimitive
 * 判断数据是否原始数据
 */
function isPrimitive(value) {
    return typeof value === 'symbol' || isStatic(value);
}
/**
 * NO.3
 * isObject
 * 判断数据是否引用类型
 */
function isObject(value) {
    const type = typeof value;
    return value !== null && (type === 'object' || type === 'function');
}
/**
 * NO.4
 * isObjectLike
 * 判断数据是否类对象
 * 不应该是null，而且typeof后的结果是“object”
 */
function isObjectLike(value) {
    return value !== null && typeof value === 'object';
}
/**
 * NO.5
 * getRawType
 * 获取数据类型，返回结果为Number、String、Object、Array等
 */
function getRawType(value) {
    return Object.prototype.toString.call(value).slice(8, -1);
}
/**
 * NO.6
 * isPlainObject
 * 判断数据是否Object类型数据
 */
function isPlainObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
}
/**
 * NO.7
 * isArray
 * 判断数据是否Array类型数据
 * Array.isArray的兼容写法(Array.isArray = Array.isArray || isArray;)
 */
function isArray(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
}
/**
 * NO.8
 * isRegExp
 * 判断数据是否正则对象
 */
function isRegExp(value) {
    return Object.prototype.toString.call(value) === '[object RegExp]';
}
/**
 * NO.9
 * isDate
 * 判断数据是否时间对象
 */
function isDate(value) {
    return Object.prototype.toString.call(value) === '[object Date]';
}
/**
 * NO.10
 * isFunction
 * 判断数据是否函数
 */
function isFunction(value) {
    return typeof value === 'function';
}
/**
 * NO.11
 * isNative
 * 判断数据是否内置函数
 */
function isNative(value) {
    return typeof value === 'function' && /native code/.test(value.toString());
}
/**
 * NO.12
 * isLength
 * 判断数据是否为有效的类数组长度
 * Number类型、大于等于0、整数、有效范围
 */
function isLength(value) {
    return typeof value === 'number' && value > -1 && value % 1 === 0 && value <= Number.MAX_SAFE_INTEGER;
}
/**
 * NO.13
 * isArrayLike
 * 判断数据是否是类数组
 * 有合法length值但是不为函数(函数length表示期望参数个数)
 */
function isArrayLike(value) {
    return value !== null && isLength(value.length) && !isFunction(value);
}
/**
 * NO.14
 * isEmpty
 * 判断数据是否为空
 * null、字符串、数组、对象，其他类型均不为空
 */
function isEmpty(value) {
    if (value === null || value === '') {
        return true;
    }
    if (isArrayLike(value)) {
        return !value.length;
    }
    if (isPlainObject(value)) {
        for (const key in value) {
            if (value.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }
    return false;
}
/**
 * NO.15
 * cached —— 记忆函数
 * 缓存函数的运算结果
 */
function cached(fn) {
    const cache = Object.create(null);
    return function cachedFn(str) {
        // console.log(cache);
        return cache[str] || (cache[str] = fn(str));
    };
}
// const cachedFn = cached(str => str.split(''));
/**
 * NO.16
 * camelize
 * 下划线线转驼峰命名 —— 非开头
 * REG: /\B(?:_(\w))/g
 */
function camelize(str) {
    if (typeof str !== 'string') {
        throw new Error('param must be String!');
    }
    return str.replace(/\B(?:_(\w))/g, function(_, c) {
        return c ? c.toUpperCase() : '';
    });
}
/**
 * NO.17
 * hyphenate
 * 驼峰命名转下划线命名 —— 非开头
 * REG: /\B([A-Z])/g
 * 拆分字符串，使用_相连，并且转换为小写
 */
function hyphenate(str) {
    if (typeof str !== 'string') {
        throw new Error('param must be String!');
    }
    return str.replace(/\B([A-Z])/g, '_$1').toLowerCase();
}
/**
 * NO.18
 * capitalize
 * 字符串首位大写
 */
function capitalize(str) {
    if (typeof str !== 'string') {
        throw new Error('param must be String!');
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}
/**
 * NO.19
 * extend
 * 将属性混合到目标对象中
 */
function extend(to, _from) {
    if (isPrimitive(to) || isPrimitive(_from)) {
        throw new Error("param must't be primitive type!");
    }
    for (const key in _from) {
        to[key] = _from[key];
    }
    return to;
}

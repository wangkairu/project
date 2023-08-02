/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}

// /**
//  * @param {string} str
//  * @returns {Boolean}
//  */
// export function validUsername(str) {
//     const valid_map = ['admin', 'editor']
//     return valid_map.indexOf(str.trim()) >= 0
// }


//   验证用户名  用户名要求 数字、字母、下划线的组合，其中数字和字母必须同时存在*
export function isvalidUsername(str) {
    const reg = /\w$/;
    return reg.test(str);
}

// 验证密码   密码，以字母开头，长度在8~18之间，只能包含字母、数字和下划线
export function isvalidPass(str) {
    const reg = /^[a-zA-Z]\w$/;
    return reg.test(str);
}
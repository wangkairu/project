// import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
    return sessionStorage.getItem(TokenKey)
  }
  
  export function setToken(token) {
    return sessionStorage.setItem(TokenKey, token)
  }
  
  export function removeToken() {
    console.log(TokenKey,'/dataTable')
    return sessionStorage.removeItem(TokenKey)
  }
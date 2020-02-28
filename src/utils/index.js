import { curry, cloneDeep, flow, isString } from 'lodash'
import { i18n } from './config'
import pathToRegexp from 'path-to-regexp'
import umiRouter from 'umi/router'
import moment from 'moment'
// 注意：必须引入相关文件，不然一直是默认的en
import 'moment/locale/zh-cn'
import 'moment/locale/pt-br'

export config from './config'
export { Color } from './theme'

export const languages = i18n ? i18n.languages.map(item => item.key) : []
export const defaultLanguage = i18n ? i18n.defaultLanguage : ''

export const deLangPrefix = curry(
  /**
   * Remove the language prefix in pathname.
   * @param   {array}     languages  Specify which languages are currently available.
   * @param   {string}    pathname   Remove the language prefix in the pathname.
   * @return  {string}    Return the pathname after removing the language prefix.
   */
  (languages, pathname) => {
    if (!pathname) {
      return
    }
    for (const item of languages) {
      if (pathname.startsWith(`/${item}/`)) {
        return pathname.replace(`/${item}/`, '/')
      }
    }
    return pathname
  }
)(languages)

/**
 * Add the language prefix in pathname.
 * @param   {string}    pathname   Add the language prefix in the pathname.
 * @return  {string}    Return the pathname after adding the language prefix.
 */
export function addLangPrefix(pathname) {
  if (!i18n) {
    return pathname
  }
  const prefix = langFromPath(window.location.pathname)
  return `/${prefix}${deLangPrefix(pathname)}`
}

const routerAddLangPrefix = params => {
  if (!i18n) {
    return params
  }
  if (isString(params)) {
    params = addLangPrefix(params)
  } else {
    params.pathname = addLangPrefix(params.pathname)
  }
  return params
}

/**
 * Whether the path matches the regexp if the language prefix is ignored, https://github.com/pillarjs/path-to-regexp.
 * @param   {string|regexp|array}     regexp     Specify a string, array of strings, or a regular expression.
 * @param   {string}                  pathname   Specify the pathname to match.
 * @return  {array|null}              Return the result of the match or null.
 */
export function pathMatchRegexp(regexp, pathname) {
  return pathToRegexp(regexp).exec(deLangPrefix(pathname))
}

/**
 * Query which layout should be used for the current path based on the configuration.
 * @param {layouts} layouts Layout configuration.
 * @param {pathname} pathname Path name to be queried.
 * @return {string} Return frist object when query success.
 */
export function queryLayout(layouts, pathname) {
  let result = 'public'

  const isMatch = regexp => {
    return regexp instanceof RegExp
      ? regexp.test(pathname)
      : pathMatchRegexp(regexp, pathname)
  }
  for (const item of layouts) {
    let include = false
    let exclude = false
    if (item.include) {
      for (const regexp of item.include) {
        if (isMatch(regexp)) {
          include = true
          break
        }
      }
    }
    if (include && item.exclude) {
      for (const regexp of item.exclude) {
        if (isMatch(regexp)) {
          exclude = true
          break
        }
      }
    }

    if (include && !exclude) {
      result = item.name
    }
  }

  return result
}

/**
 * get language from pathname
 * @param {pathname} pathname
 */
export const langFromPath = pathname => {
  for (const item of languages) {
    if (pathname.startsWith(`/${item}/`)) {
      return item
    }
  }
  return defaultLanguage
}

/**
 * Convert an array to a tree-structured array.
 * @param   {array}     array     The Array need to Converted.
 * @param   {string}    id        The alias of the unique ID of the object in the array.
 * @param   {string}    parentId       The alias of the parent ID of the object in the array.
 * @param   {string}    children  The alias of children of the object in the array.
 * @return  {array}    Return a tree-structured array.
 */
export function arrayToTree(
  array,
  id = 'id',
  parentId = 'pid',
  children = 'children'
) {
  let result = []
  let hash = {}
  const data = cloneDeep(array)
  // Turn the array into an object, the key name is the id of each piece of data
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach(item => {
    // 在hash中寻找该元素的父元素
    const hashParent = hash[item[parentId]]
    if (hashParent) {
      // 如果该父元素没有children属性，就创建该属性且为数组
      !hashParent[children] && (hashParent[children] = [])
      hashParent[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

/**
 * 在push和replace pathname之前，给pathname添加当前语言前缀
 */
const myRouter = { ...umiRouter }
myRouter.push = flow(routerAddLangPrefix, umiRouter.push)
myRouter.replace = flow(routerAddLangPrefix, myRouter.replace)

export const router = myRouter


// 获取当前路由的pathname
export function getLocale() {
  return langFromPath(window.location.pathname)
}

// 改变时间国际化和路由国际化
export function setLocale(language) {
  if (getLocale() !== language) {
    moment.locale(language === 'zh' ? 'zh-cn' : language)
    umiRouter.push({
      pathname: `/${language}${deLangPrefix(window.location.pathname)}`,
      search: window.location.search
    })
  }
}

/**
 * 查找祖先（逐级查找）
 * @param {array} array 需要转换的数组
 * @param {string} current 指定需要查询的对象
 * @param {string} parentId 数组中对象的父ID的别名
 * @param {string} id 数组中对象的唯一ID的别名
 * @param {array} 返回一个数组
 */
export function queryAncestors(array, current, parentId, id = 'id') {
  const result = [current]
  const hashMap = new Map()
  array.forEach(item => hashMap.set(item[id], item))
  const getPath = current => {
    const currentParentId = hashMap.get(current[id])[parentId]
    if (currentParentId) {
      result.push(hashMap.get(currentParentId))
      getPath(hashMap.get(currentParentId))
    }
  }
  getPath(current)
  return result
}

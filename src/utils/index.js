import { curry, cloneDeep } from 'lodash'
import { i18n } from './config'
import { pathToRegexp } from 'path-to-regexp'

export config from './config'

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

/**
 * Whether the path matches the regexp if the language prefix is ignored, https://github.com/pillarjs/path-to-regexp.
 * @param   {string|regexp|array}     regexp     Specify a string, array of strings, or a regular expression.
 * @param   {string}                  pathname   Specify the pathname to match.
 * @return  {array|null}              Return the result of the match or null.
 */
export function pathMatchRegexp(regepx, pathname) {
  return pathToRegexp(regepx).exec(deLangPrefix(pathname))
}

/**
 * Query which layout should be used for the current path based on the configuration.
 * @param {layouts} layouts Layout configuration.
 * @param {pathname} pathname Path name to be queried.
 * @return {string} Return frist object when query success.
 */
export function queryLayout(layouts, pathname) {
  let result = 'public'

  const isMatch = regepx => {
    return regepx instanceof RegExp
      ? regepx.test(pathname)
      : pathMatchRegexp(regepx, pathname)
  }
  for (const item of layouts) {
    let include = false
    let exclude = false
    if (item.include) {
      for (const regepx of item.include) {
        if (isMatch(regepx)) {
          include = true
          break
        }
      }
    }
    if (include && item.exclude) {
      for (const regepx of item.exclude) {
        if (isMatch(regepx)) {
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
    const hashParent = hash[item[parentId]]
    if (hashParent) {
      !hashParent[children] && (hashParent[children] = [])
      hashParent[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

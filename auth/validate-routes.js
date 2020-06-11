import _ from 'lodash'

import privateRoutes from './private-routes'

const validateRoute = (routeObject, rolName) => {
  /**
   * route: /dashboard
   *
   * console.log(routeObject)
   *
   * {
   *   name: 'dashboard',
   *   meta: [
   *     {}
   *   ],
   *   path: '/dashboard',
   *   hash: '',
   *   query: {},
   *   params: {},
   *   fullPath: '/dashboard',
   *   matched: [
   *     {
   *       path: '/dashboard',
   *       regex: /^\/dashboard(?:\/(?=$))?$/i,
   *       components: [Object],
   *       instances: {},
   *       name: 'dashboard',
   *       parent: undefined,
   *       matchAs: undefined,
   *       redirect: undefined,
   *       beforeEnter: undefined,
   *       meta: {},
   *       props: {}
   *     }
   *   ]
   * }
   *
   */

  const lengthMatches = routeObject.matched.length
  if (lengthMatches > 0) {
    const { matched: matches } = routeObject
    // https://lodash.com/docs/#find
    const routesByRolName = _.get(privateRoutes, rolName, [])
    const routeFound = _.find(routesByRolName, (pr) =>
      _.find(matches, (m) => m.path === pr)
    )
    return routeFound
  }
  return false
}
export default validateRoute

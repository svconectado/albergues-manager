/* It's activated when the route change */
import _ from 'lodash'

import privateRoutes from '~/auth/private-routes'
import validateRoute from '~/auth/validate-routes'

export default function({ store, redirect, route, error }) {
  const {
    state: {
      users: { user }
    }
  } = store

  /* If there is not a logged user then the roleName will be 'not_login'
   * because in the privateRoutes exist a list of private routes
   * for the not logged user
   */
  const rolName = _.get(user, 'user.role.name', 'not_login')

  /* If it doesn't exist the role name of the logged user in the
   * privateRoutes list then it's necessary dispatch the 'logoutUser'
   * store action and redirects to login page
   */
  const routesByRolName = _.get(privateRoutes, rolName)
  if (!routesByRolName) {
    store.dispatch('users/logoutUser').then(() => redirect('/'))
  }

  /* If rol name exist in the privateRoutes list, then the next step is;
   * check if the route is private.
   *
   * If the route is private then the error page will be displayed
   * with a message that indicates that it's a private route, it's
   * not necessary dispatch the 'logoutUser' action
   */
  const isPrivateRoute = validateRoute(route, rolName)
  // https://nuxtjs.org/api/context#-code-error-code-em-function-em-
  if (isPrivateRoute)
    error({ statusCode: 403, message: 'Sin permiso para acceder' })
}

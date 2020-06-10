/* It's activated when the route change */
import _ from 'lodash'

import validateRoute from '~/auth/validate-routes'

export default function({ store, redirect, route }) {
  const {
    state: {
      users: { user }
    }
  } = store
  const rolName = _.get(user, 'user.role.name', 'not_login')
  const isPrivateRoute = validateRoute(route, rolName)
  if (isPrivateRoute) redirect('/')
}

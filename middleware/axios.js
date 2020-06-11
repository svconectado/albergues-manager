/**
 * It's activated when the route change and
 * in the first load of the site.
 *
 * axios middleware is loaded first than the axios
 * plugin so it's a good place to configure the
 * $axios object
 */
import _ from 'lodash'

export default function({ $axios, store }) {
  $axios.setBaseURL(process.env.BASE_URL_API)
  const userWithToken = _.get(store, 'state.users.user.jwt', false)
  $axios.setToken(false)
  if (userWithToken) {
    $axios.setToken(userWithToken, 'Bearer')
  }
}

/* It's activated when a request is made.
 *
 * Its functionality is to verify the user's login
 * in each request, as double verification of the
 * user's session.
 */

export default function({ $axios }) {
  $axios.setBaseURL(process.env.BASE_URL_API)
  $axios.setToken(process.env.TOKEN_HOSTEL_MANAGER, 'Bearer')
}

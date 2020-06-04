/**
 * It's activated when the route change and
 * in the first load of the site.
 *
 * axios middleware is loaded first than the axios
 * plugin so it's a good place to configure the
 * $axios object
 */

export default function({ $axios }) {
  $axios.setBaseURL(process.env.BASE_URL_API)
}

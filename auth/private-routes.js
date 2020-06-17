/* Inspect the file .nuxt/router.js
 *
 * If you want to add another private route, you need
 * to see the file and add the specific route
 * to restrict access.
 *
 * This routes will be validate for the auth/validate-routes.js file
 */

/*
 * Routes examples
 *
 * [
 *   '/posts/dashboard',
 *   '/posts/dashboard/add',
 *   '/posts/dashboard/edit/:id?'
 * ]
 *
 */

const routes = {
  // Routes where the user doesn't have access
  not_login: [
    '/dashboard',
    '/dashboard/personas',
    '/dashboard/personas/registro',
    '/dashboard/albergues',
    '/dashboard/albergues/registro'
  ],
  hostel_manager: [],
  Director: [
  '/dashboard/personas/registro',
  ]
}
export default routes

'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')

Route
  .get('/', 'DashboardController.index')
  .middleware(['auth'])
  .as('dashboard')

Route
  .post('/IG/:params?', 'InstagramAccountController.index')
  .middleware(['auth'])
  .as('Instagram')

Route
  .group(() => {
    Route.route('/Autopost/:params?/:id?', 'ToolController.autoPost',['GET','POST']).as('Autopost')
  })
  .prefix('tools')
  .middleware(['auth'])

Route
  .route('/auth/:params?', 'AuthController.index', ['GET','POST'])
  .as('Auth')
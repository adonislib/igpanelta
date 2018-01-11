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
  .get('/', 'IgAccountController.index')
  .middleware(['auth'])
Route
  .post('/add', 'IgAccountController.add')
  .middleware(['auth'])
  .as('addAccount')
Route
  .post('/delete', 'IgAccountController.delete')
  .middleware(['auth'])
  .as('deleteAccount')
Route
  .post('/check', 'IgAccountController.check')
  .middleware(['auth'])
  .as('checkAccount')
Route
  .post('/edit', 'IgAccountController.edit')
  .middleware(['auth'])
  .as('editAccount')

Route
  .group(() => {
    Route.get('/', 'AuthController.index')
    Route.get('/logout', 'AuthController.logout').as('Logout')
    Route.post('/', 'AuthController.login').as('Login')
  })
  .prefix('auth')

Route
  .group(() => {
    Route.post('/Autopost/add', 'AutoPostController.add').as('AutopostAdd')
    Route.post('/Autopost/delete', 'AutoPostController.delete').as('AutopostDelete')
    Route.get('/Autopost/add', 'AutoPostController.addView').as('AutopostAddView')
    Route.get('/Autopost/:page?', 'AutoPostController.index').as('AutopostIndex')
  })
  .prefix('tools')
  .middleware(['auth'])
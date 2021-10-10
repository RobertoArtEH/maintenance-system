/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

/** Auth */
Route.post('login', 'AuthController.login')
Route.get('logout', 'AuthController.logout')
Route.post('register', 'AuthController.register')

/** User */
Route.get('users/index', 'UsersController.index')
Route.post('user/save', 'UsersController.save')
Route.post('user/delete', 'UsersController.delete')

/** Request services */
Route.get('services/index', 'ServiceRequestsController.index')
Route.post('service/save', 'ServiceRequestsController.save')
Route.post('service/delete', 'ServiceRequestsController.delete')

/** Maintenance Logs */
Route.get('maintenance/index', 'MaintenanceLogsController.index')
Route.post('maintenance/save', 'MaintenanceLogsController.save')
Route.post('maintenance/delete', 'MaintenanceLogsController.delete')

/** System */
Route.get('roles/index', 'SystemsController.getRoles')
Route.get('areas/index', 'SystemsController.getAreas')
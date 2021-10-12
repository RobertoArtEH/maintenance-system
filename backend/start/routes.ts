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
Route.get('user/load/:id', 'UsersController.find')
Route.post('user/delete', 'UsersController.delete')

/** Request services */
Route.get('services/index', 'ServiceRequestsController.index')
Route.get('service/load/:id', 'ServiceRequestsController.find')
Route.post('service/save', 'ServiceRequestsController.save')
Route.post('service/cancel/:id', 'ServiceRequestsController.cancel')

// Maintenance Logs 
Route.get('maintenance/index', 'MaintenanceLogsController.index')
Route.post('maintenance/save', 'MaintenanceLogsController.save')
Route.post('maintenance/delete', 'MaintenanceLogsController.delete')

// Areas 
Route.get('areas/index', 'AreasController.index')

// Roles 
Route.get('roles/index', 'RolesController.index')

// Calendars 
Route.get('calendars/index', 'CalendarsController.index')
Route.post('calendar/save', 'CalendarsController.save')

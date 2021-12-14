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

Route.group(() => {
  /** Users */
  Route.get('users/index', 'UsersController.index')
  Route.post('user/save', 'UsersController.save')
  Route.get('user/load/:id', 'UsersController.find')
  Route.post('user/delete', 'UsersController.delete')

  /** Requisitions */
  Route.get('requisitions/index', 'RequisitionController.index')
  Route.get('requisition/load/:id', 'RequisitionController.find')
  Route.post('requisition/save', 'RequisitionController.save')
  Route.post('requisition/accept/:id', 'RequisitionController.accept')
  Route.post('requisition/finish/:id', 'RequisitionController.finish')
  Route.post('requisition/cancel/:id', 'RequisitionController.cancel')

  /** Request services */
  Route.get('services/index', 'ServiceRequestsController.index')
  Route.get('service/load/:id', 'ServiceRequestsController.find')
  Route.post('service/save', 'ServiceRequestsController.save')
  Route.post('service/accept/:id', 'ServiceRequestsController.accept')
  Route.post('service/finish/:id', 'ServiceRequestsController.finish')
  Route.post('service/cancel/:id', 'ServiceRequestsController.cancel')

  /** Maintenance Logs */
  Route.get('maintenance/index', 'MaintenanceLogsController.index')
  Route.get('maintenance/load/:id', 'MaintenanceLogsController.find')
  Route.post('maintenance/save', 'MaintenanceLogsController.save')
  Route.post('maintenance/accept/:id', 'MaintenanceLogsController.accept')
  Route.post('maintenance/finish/:id', 'MaintenanceLogsController.finish')
  Route.post('maintenance/cancel/:id', 'MaintenanceLogsController.cancel')

  /** Calendars */
  Route.get('calendars/index', 'CalendarsController.index')
  Route.post('calendar/save', 'CalendarsController.save')
  Route.get('laboratory/calendars/index', 'LaboratoryCalendarsController.index')
  Route.post('laboratory/calendar/save', 'LaboratoryCalendarsController.save')

  /** System */
  Route.get('areas/index', 'AreasController.index')
  Route.get('roles/index', 'RolesController.index')
  Route.get('laboratories/index', 'LaboratoriesController.index')
})//.middleware('auth:api')

// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import ServiceRequest from 'App/Models/ServiceRequest'
import ServiceRequestItem from 'App/Models/ServiceRequestItem'

export default class ServiceRequestsController {
  public async index ({ response }) {
    try {
      const users = await ServiceRequest.query().preload('items')
      return users
    } catch (error) {
      return response.badRequest('Ocurrió un error al consultar los usuarios.')
    }
  }

  public async save ({ request, response }) {
    try {
      const data = request.all()

      const service = await ServiceRequest.updateOrCreate({ id: data.id ?? null }, data)

      for (const item of data.items) {
        await ServiceRequestItem.updateOrCreate({ id: item.id ?? null }, { serviceRequestId: service.id, ...item})
      }

      return service
    } catch (error) {
      return response.badRequest('Ocurrió un error al guardar la solicitud de servicio.')
    }
  }

  public async delete ({ request, response }) {
    try {
      const data = request.all()

      return new Date()
    } catch (error) {
      return response.badRequest('Ocurrió un error al guardar la solicitud de servicio.')
    }
  }
}

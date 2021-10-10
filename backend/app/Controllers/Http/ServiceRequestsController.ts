// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import ServiceRequest from 'App/Models/ServiceRequest'
import ServiceRequestItem from 'App/Models/ServiceRequestItem'
import { Constants } from '../../../constants'

export default class ServiceRequestsController {
  /**
   * Lista de solicitudes de servicio
   * @returns json
   */
  public async index ({ response })
  {
    try {
      const services = await ServiceRequest.query()
        .preload('status')
        .preload('area')
        .preload('responsible')

      return response.ok({ status: true, data: services })
    } catch (error) {
      console.log(error.message)

      return response.badRequest('Ocurrió un error al consultar los usuarios.')
    }
  }

  /**
   * Cargar información de la solicitud de servicio
   * @param int id
   * @returns Json
   */
  public async find ({ request, response })
  {
    try {
      const id = request.param('id', 0)

      const service = await ServiceRequest.query()
        .preload('status')
        .preload('area')
        .preload('responsible')
        .where('id', id)
        .first()

      if (service && service.serviceStatusId === Constants.STATUS_CANCEL) {
        return response.unauthorized({ status: false, message: 'La solicitud de servicio se encuentra cancelada.' })
      }

      return response.ok({ status: true, data: service })
    } catch (error) {
      console.log(error.message)

      return response.badRequest({ status: true, message: 'Ocurrió un error al consultar los usuarios.' })
    }
  }

  /**
   * Guardar o actualizar solicitud de servicio
   * @param request
   * @returns Json
   */
  public async save ({ request, response })
  {
    try {
      const data = request.all()

      const service = await ServiceRequest.updateOrCreate({ id: data.id ?? null }, data)

      for (const item of data.items) {
        await ServiceRequestItem.updateOrCreate({ id: item.id ?? null }, { serviceRequestId: service.id, ...item})
      }

      return response.ok({ status: true, data: service, message: 'La solicitud de servicio se guardó con éxito.' })
    } catch (error) {
      console.log(error.message)

      return response.badRequest('Ocurrió un error al guardar la solicitud de servicio.')
    }
  }

  /**
   * Cambiar estatus a cancelado
   * @param int id
   * @returns Json
   */
  public async cancel ({ request, response })
  {
    try {
      const id = request.param('id', 0)

      const service = await ServiceRequest.find(id)

      if (service) {
        service.serviceStatusId = Constants.STATUS_CANCEL
        service.save()
      }

      return response.ok({ status: true, data: [], message: 'La solicitud de servicio se canceló con éxito.' })
    } catch (error) {
      console.log(error.message)

      return response.badRequest('Ocurrió un error al guardar la solicitud de servicio.')
    }
  }
}

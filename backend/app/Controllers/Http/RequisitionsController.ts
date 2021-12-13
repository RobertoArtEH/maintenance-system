// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Requisition from 'App/Models/Requisition'
import RequisitionItem from 'App/Models/RequisitionItem'
import { Constants } from '../../../constants'

export default class RequisitionsController {
      /**
   * Lista de solicitudes de servicio
   * @returns json
   */
  public async index ({ response }) {
    try {
      const requisitons = await Requisition.query()
        .preload('status')
        .preload('responsible')
        .preload('authorizedUser')

      return response.ok({ status: true, data: requisitons })
    } catch (error) {
      console.log(error.message)

      return response.badRequest({ status: false, message: 'Ocurrió un error al consultar las requisiones.'})
    }
  }

  /**
   * Cargar información de la solicitud de servicio
   * @param int id
   * @returns Json
   */
  public async find ({ request, response }) {
    try {
      const id = request.param('id', 0)

      const requisition = await Requisition.query()
        .preload('status')
        .preload('responsible')
        .preload('authorizedUser')
        .where('id', id)
        .first()

      if (requisition && requisition.requisitionStatusId === Constants.STATUS_CANCEL) {
        return response.unauthorized({ status: false, message: 'La requisición se encuentra cancelada.' })
      }

      return response.ok({ status: true, data: requisition })
    } catch (error) {
      console.log(error.message)

      return response.badRequest({ status: false, message: 'Ocurrió un error al consultar la requisición.' })
    }
  }

  /**
   * Crear o actualizar solicitud de servicio
   * @param request
   * @returns Json
   */
  public async save ({ request, response }) {
    try {
      const data = request.all()

      const requisition = await Requisition.updateOrCreate({ id: data.id ?? null }, data)

      for (const item of data.items) {
        await RequisitionItem.updateOrCreate({ id: item.id ?? null }, { requisitionId: requisition.id, ...item})
      }

      return response.ok({ status: true, data: requisition, message: 'La requisición se guardó con éxito.' })
    } catch (error) {
      console.log(error.message)

      return response.badRequest({ status: false, message: 'Ocurrió un error al guardar la requisición.'})
    }
  }

  /**
   * Cambiar estatus a cancelado
   * @param int id
   * @returns Json
   */
  public async accept ({ request, response }) {
    try {
      const id = request.param('id', 0)

      const service = await Requisition.find(id)

      if (service) {
        service.requisitionStatusId = Constants.STATUS_ACCEPT
        service.save()
      }

      return response.ok({ status: true, data: [], message: 'La solicitud de servicio se aceptó con éxito.' })
    } catch (error) {
      console.log(error.message)

      return response.badRequest({ status: false, message: 'Ocurrió un error al aceptar la solicitud de servicio.'})
    }
  }

  /**
   * Cambiar estatus a cancelado
   * @param int id
   * @returns Json
   */
  public async finish ({ request, response }) {
    try {
      const id = request.param('id', 0)

      const requisition = await Requisition.find(id)

      if (requisition) {
        requisition.requisitionStatusId = Constants.STATUS_FINISH
        requisition.save()
      }

      return response.ok({ status: true, data: [], message: 'La requisión se finalizó con éxito.' })
    } catch (error) {
      console.log(error.message)

      return response.badRequest({ status: false, message: 'Ocurrió un error al finalizar la requisión.'})
    }
  }

  /**
   * Cambiar estatus a cancelado
   * @param int id
   * @returns Json
   */
  public async cancel ({ request, response }) {
    try {
      const id = request.param('id', 0)

      const service = await Requisition.find(id)

      if (service) {
        service.requisitionStatusId = Constants.STATUS_CANCEL
        service.save()
      }

      return response.ok({ status: true, data: [], message: 'La solicitud de servicio se canceló con éxito.' })
    } catch (error) {
      console.log(error.message)

      return response.badRequest({ status: false, message: 'Ocurrió un error al cancelar la solicitud de servicio.'})
    }
  }
}

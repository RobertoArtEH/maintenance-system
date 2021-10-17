import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm';
// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import MaintenanceLog from 'App/Models/MaintenanceLog'
import MaintenanceLogItem from 'App/Models/MaintenanceLogItem'
import { Constants } from '../../../constants'

export default class MaintenanceLogsController {
  public async index ({ response }) {
    try{
      const maintenanceLogs = await MaintenanceLog.query()
        .preload('items')
        .preload('responsible')
        .preload('status')
        .preload('serviceRequest')

      return response.ok({ status: true, data: maintenanceLogs })
    } catch (error) {
      console.log(error.message)

      return response.badRequest({
        status: false,
        message: 'Ocurrió un error al consultar los registros de mantenimiento.',
      })
    }
  }

  public async save ({ request, response }) {
    try {
      const data = request.all()

      const maintenanceLog = await MaintenanceLog.updateOrCreate({ id: data.id ?? null }, data)

      for (const item of data.items) {
        await MaintenanceLogItem.updateOrCreate(
          { id: item.id ?? null },
          { maintenanceLogId: maintenanceLog.id, ...item}
        )
      }

      return response.ok({ status: true, data: maintenanceLog })
    } catch (error) {
      console.log(error.message)

      return response.badRequest('Ocurrió un error al guardar el registro de mantenimiento.')
    }
  }

  public async find ({ request, response }) {
    try {
      const id = request.param('id', 0)

      const maintenance = await MaintenanceLog.query()
        .preload('status')
        .preload('items')
        .preload('responsible')
        .preload('serviceRequest')
        .where('id', id)
        .first()

      if (maintenance && maintenance.maintenanceStatusId === Constants.STATUS_CANCEL) {
        return response.unauthorized({ status: false, message: 'El registro de mantenimiento se encuentra cancelado.' })
      }

      return response.ok({ status: true, data: maintenance })
    } catch (error) {
      console.log(error.message)

      return response.badRequest({
        status: false,
        message: 'Ocurrió un error al consultar los registros de mantenimiento.',
      })
    }
  }

  public async accept ({ request, response }) {
    try {
      const id = request.param('id', 0)

      const maintenance = await MaintenanceLog.find(id)

      if (maintenance) {
        maintenance.maintenanceStatusId = Constants.STATUS_ACCEPT
        maintenance.save()
      }

      return response.ok({ status: true, data: [], message: 'El registro de mantenimiento se aceptó con éxito.' })
    } catch (error) {
      console.log(error.message)

      return response.badRequest({ status: false, message: 'Ocurrió un error al aceptar el registro de mantenimiento.'})
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

      const maintenance = await MaintenanceLog.find(id)

      if (maintenance) {
        maintenance.maintenanceStatusId = Constants.STATUS_FINISH
        maintenance.save()
      }

      return response.ok({ status: true, data: [], message: 'El registro de mantenimiento se finalizó con éxito.' })
    } catch (error) {
      console.log(error.message)

      return response.badRequest({
        status: false,
        message: 'Ocurrió un error al finalizar el registro de mantenimiento.',
      })
    }
  }

  public async cancel ({ request, response }) {
    try {
      const id = request.param('id', 0)

      const service = await MaintenanceLog.find(id)

      if (service) {
        service.maintenanceStatusId = Constants.STATUS_CANCEL
        service.save()
      }

      return response.ok({ status: true, data: [], message: 'El registro de mantenimiento se canceló con éxito.' })
    } catch (error) {
      console.log(error.message)

      return response.badRequest({ status: false, message: 'Ocurrió un error al guardar el registro de mantenimiento.'})
    }
  }
}

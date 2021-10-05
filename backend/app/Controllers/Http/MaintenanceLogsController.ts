import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import MaintenanceLog from 'App/Models/MaintenanceLog'
import MaintenanceLogItem from 'App/Models/MaintenanceLogItem'

export default class MaintenanceLogsController {
  public async index ({ request}: HttpContextContract) {
    const maintenanceLogs = await MaintenanceLog.query().preload('items')
    return maintenanceLogs
  }

  public async show ({ request, params}: HttpContextContract) {
    try {
      const maintenanceLog = await MaintenanceLog.find(params.id)
      if(maintenanceLog){
        await maintenanceLog.preload('items')
        return maintenanceLog
      }
    } catch (error) {
      console.log(error)
    }
  }

  public async save ({ request, response }) {
    try {
      const data = request.all()

      const service = await MaintenanceLog.updateOrCreate({ id: data.id ?? null }, data)

      for (const item of data.items) {
        await MaintenanceLogItem.updateOrCreate({ id: item.id ?? null }, { maintenanceLogId: service.id, ...item})
      }

      return service
    } catch (error) {
      //return response.badRequest('Ocurrió un error al guardar el registro de mantenimiento.')
      return error.message
    }
  }

  public async update ({ request, params}: HttpContextContract) {
    const maintenanceLog = await MaintenanceLog.find(params.id)
    if (maintenanceLog) {
      maintenanceLog.serviceTypeId = request.input('serviceTypeId')
      maintenanceLog.responsibleId = request.input('responsibleId')
      maintenanceLog.maintenanceStatusId = request.input('maintenanceStatusId')
      maintenanceLog.serviceDate = request.input('serviceDate')

      if (await maintenanceLog.save()) {
        await maintenanceLog.preload('items')
        return maintenanceLog
      }
      return // 422
    }
    return // 401
  }

  public async store ({ request, response}: HttpContextContract) {
    const maintenanceLog = new MaintenanceLog()

    maintenanceLog.serviceTypeId = request.input('serviceTypeId')
    maintenanceLog.responsibleId = request.input('responsibleId')
    maintenanceLog.maintenanceStatusId = request.input('maintenanceStatusId')
    maintenanceLog.serviceDate = request.input('serviceDate')
    await maintenanceLog.save()
    return maintenanceLog
  }

  public async destroy ({response, auth, request, params}: HttpContextContract) {
    const maintenanceLog = await MaintenanceLog.query().where('id', params.id).delete()
    return
  }
}

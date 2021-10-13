import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import MaintenanceLog from 'App/Models/MaintenanceLog'
import MaintenanceLogItem from 'App/Models/MaintenanceLogItem'

export default class MaintenanceLogsController {
  public async index ({ request, response}: HttpContextContract) {
    try{
      const maintenanceLogs = await MaintenanceLog.query().preload('items').preload('responsible').preload('status')
      return response.ok({ status: true, data: maintenanceLogs })
    } catch (error) {
      console.log(error.message)
      // eslint-disable-next-line max-len
      return response.badRequest({ status: false, message: 'Ocurrió un error al consultar los registros de mantenimiento.'})
    }
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

      const maintenanceLog = await MaintenanceLog.updateOrCreate({ id: data.id ?? null }, data)

      for (const item of data.items) {
        // eslint-disable-next-line max-len
        await MaintenanceLogItem.updateOrCreate({ id: item.id ?? null }, { maintenanceLogId: maintenanceLog.id, ...item})
      }

      return response.ok({ status: true, data: maintenanceLog })
    } catch (error) {
      console.log(error.message)
      return response.badRequest('Ocurrió un error al guardar el registro de mantenimiento.')
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

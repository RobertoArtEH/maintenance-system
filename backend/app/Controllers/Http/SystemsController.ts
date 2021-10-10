// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Area from "App/Models/Area"
import Role from "App/Models/Role"

export default class SystemsController {
  public async getRoles({ response }) {
    try {
      const roles = await Role.query()
      return roles
    } catch (error) {
      return response.badRequest('Ocurrió un error al consultar los roles.')
    }
  }

  public async getAreas({ response }) {
    try {
      const areas = await Area.query()
      return areas
    } catch (error) {
      return response.badRequest('Ocurrió un error al consultar las areas.')
    }
  }
}

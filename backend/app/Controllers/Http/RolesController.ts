// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Role from "App/Models/Role"

export default class RolesController {
    public async index ({ response }) {
        try {
          const roles = await Role.all()
          return roles
        } catch (error) {
          return response.badRequest('Ocurrió un error al consultar los roles.')
        }
      }
}

// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

export default class UsersController {
  public async index ({ response }) {
    try {
      const users = await User.query().preload('role')
      return users
    } catch (error) {
      return response.badRequest('Ocurrió un error al consultar los usuarios.')
    }
  }

  public async save ({ request, response }) {
    try {
      const data = request.all()

      const user = await User.updateOrCreate({ id: data.id ?? null }, data)

      return user
    } catch (error) {
      return response.badRequest('Ocurrió un error al guardar el usuario.')
    }
  }

  public async delete ({ request, response }) {
    try {
      const data = request.all()

      return new Date()
    } catch (error) {
      return response.badRequest('Ocurrió un error al guardar el usuario.')
    }
  }
}

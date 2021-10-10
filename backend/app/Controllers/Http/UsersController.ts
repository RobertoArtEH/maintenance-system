// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

export default class UsersController {
  /**
   * Lista de usuarios
   * @returns json
   */
  public async index ({ response }) {
    try {
      const users = await User.query()
        .preload('role')
        .preload('area')

      return response.ok({ status: true, data: users })
    } catch (error) {
      return response.badRequest({ status: false, message: 'Ocurrió un error al consultar los usuarios.' })
    }
  }

  /**
   * Cargar información del usuario
   * @param int id
   * @returns Json
   */
  public async find ({ request, response }) {
    try {
      const id = request.param('id', 0)

      const user = await User.query()
        .preload('role')
        .preload('area')
        .where('id', id)
        .first()

      return response.ok({ status: true, data: user })
    } catch (error) {
      console.log(error.message)

      return response.badRequest({ status: false, message: 'Ocurrió un error al consultar los usuarios.' })
    }
  }

  /**
   * Crear o actualizar usuario
   * @param request
   * @returns Json
   */
  public async save ({ request, response }) {
    try {
      const data = request.all()

      const user = await User.updateOrCreate({ id: data.id ?? null }, data)

      return response.created({ status: true, data: user })
    } catch (error) {
      return response.badRequest({ status: false, message: 'Ocurrió un error al guardar el usuario.'})
    }
  }
}

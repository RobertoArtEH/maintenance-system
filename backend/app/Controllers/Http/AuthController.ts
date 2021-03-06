import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async login ({ auth, request, response }) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth.use('api').attempt(email, password)
      const user = await auth.use('api').user

      if (user && !user.isActive) {
        return response.unauthorized({ status: false, message: 'El usuario se encuentra bloqueado.' })
      }

      return response.ok({ status: true, data: { token, user }, message: '' })
    } catch (error) {
      console.log(error.message)

      return response.badRequest({ status: false, message: 'Credenciales incorrectas.' })
    }
  }

  public async logout ({ auth, response }) {
    await auth.use('api').revoke()
    return response.ok({ status: true, data: { revoked: true } })
  }

  public async register ({ request, response }: HttpContextContract) {
    const name = request.input('name')
    const lastName = request.input('lastName')
    const roleId = request.input('roleId')
    const careerId = request.input('careerId')
    const shiftId = request.input('shiftId')
    const email = request.input('email')
    const password = request.input('password')

    const user = new User()
    user.name = name
    user.lastName = lastName
    user.roleId = roleId
    user.careerId = careerId
    user.shiftId = shiftId
    user.email = email
    user.password = password
    await user.save()

    return response.created({ status: true, data: user, message: 'El usuario se guardó con éxito.' })
  }
}

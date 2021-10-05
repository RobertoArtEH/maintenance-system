import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async login ({ auth, request, response }) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth.use('api').attempt(email, password)
      return token
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  public async logout ({ auth, response }) {
    await auth.use('api').revoke()
    return { revoked: true }
  }

  public async register({ request }: HttpContextContract) {
    const name = request.input("name")
    const lastName = request.input("lastName")
    const roleId = request.input("roleId")
    const careerId = request.input("careerId")
    const shiftId = request.input("shiftId")
    const email = request.input("email")
    const password = request.input("password")

    const user = new User()
    user.name = name
    user.lastName = lastName
    user.roleId = roleId
    user.careerId = careerId
    user.shiftId = shiftId
    user.email = email
    user.password = password
    await user.save()

    return
  }
}
// MQ.oeWgyOBXsbIcBAxS2U6sOwzlCNZ6cWF-Z-I49KWUfdgMn7O2zpJXK0Hw76u9
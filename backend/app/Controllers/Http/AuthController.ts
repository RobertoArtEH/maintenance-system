import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

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
}
// MQ.oeWgyOBXsbIcBAxS2U6sOwzlCNZ6cWF-Z-I49KWUfdgMn7O2zpJXK0Hw76u9
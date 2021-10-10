// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Area from "App/Models/Area"

export default class AreasController {
    public async index ({ response }) {
        try {
          const areas = await Area.all()
          return areas
        } catch (error) {
          return response.badRequest('Ocurrió un error al consultar las areas.')
        }
      }
}

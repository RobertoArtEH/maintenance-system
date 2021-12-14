// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Laboratory from "App/Models/Laboratory"

export default class LaboratoriesController {
    public async index ({ response }) {
        try {
            const laboratories = await Laboratory.all()
            return laboratories
        } catch (error) {
            return response.badRequest('Ocurrió un error al consultar los laboratorios.')
        }
    }
}

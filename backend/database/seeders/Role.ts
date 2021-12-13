import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'

export default class RoleSeeder extends BaseSeeder {
  public async run () {
    await Role.createMany([
      /** Departamento de sistemas */
      { id: 1, name: 'Jefe de sistemas' },
      { id: 2, name: 'Confianza' },
      { id: 3, name: 'Técnico' },
      { id: 4, name: 'Asistente de sistemas' },
      /** Departamentos */
      { id: 5, name: 'Responsable de área' },
      { id: 6, name: 'Coordinador' },
      { id: 7, name: 'Asistente' },
      /** Laboratorio */
      { id: 8, name: 'Jefe de Servicios Tecnológicos' },
      { id: 9, name: 'Auxiliar de Laboratorio' },
    ])
  }
}

import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'

export default class RoleSeeder extends BaseSeeder {
  public async run () {
    await Role.createMany([
      /** Departamento de sistemas */
      { name: 'Jefe de sistemas' },
      { name: 'Confianza' },
      { name: 'Técnico' },
      { name: 'Asistente de sistemas' },
      /** Departamentos */
      { name: 'Responsable de área' },
      { name: 'Coordinador' },
      { name: 'Asistente' },
    ])
  }
}

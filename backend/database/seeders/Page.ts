import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Page from 'App/Models/Page'

export default class PageSeeder extends BaseSeeder {
  public async run () {
    await Page.createMany([
      /** Sistema */
      { name: 'Usuarios' },
      /** Solicitudes */
      { name: 'Solicitudes' },
      /** Calendario */
      { name: 'Calendario' },
      /** Mantenimiento */
      { name: 'Mantenimiento' },
    ])
  }
}

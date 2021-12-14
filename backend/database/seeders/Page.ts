import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Page from 'App/Models/Page'

export default class PageSeeder extends BaseSeeder {
  public async run () {
    await Page.createMany([
      /** Sistema */
      { id: 1, name: 'Usuarios' },
      /** Solicitudes */
      { id: 2, name: 'Solicitudes' },
      /** Calendario */
      { id: 3, name: 'Calendario' },
      /** Mantenimiento */
      { id: 4, name: 'Mantenimiento' },
      /** Requisiciones */
      { id: 5, name: 'Requisiciones' },
    ])
  }
}

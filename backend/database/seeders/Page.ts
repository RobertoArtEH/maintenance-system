import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Page from 'App/Models/Page'

export default class PageSeeder extends BaseSeeder {
  public async run () {
    await Page.createMany([
      { name: 'Nueva solicitud' },
      { name: 'Solicitudes pendientes' },
      { name: 'Solicitudes firmadas' },
      { name: 'Usuarios' },
    ])
  }
}

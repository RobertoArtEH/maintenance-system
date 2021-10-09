import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Area from 'App/Models/Area'

export default class AreaSeeder extends BaseSeeder {
  public async run () {
    await Area.createMany([
      { name: 'Finanzas' },
      { name: 'Administracion'},
      { name: 'Rectoria'},
      { name: 'Biblioteca'},
      { name: 'Vinculacion'},
    ])
  }
}

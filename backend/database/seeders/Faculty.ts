import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Faculty from 'App/Models/Faculty'

export default class FacultySeeder extends BaseSeeder {
  public async run () {
    await Faculty.createMany([
      { name: 'ver' },
      { name: 'crear' },
      { name: 'editar' },
      { name: 'eliminar' },
      { name: 'autorizar' },
      { name: 'finalizar' },
    ])
  }
}

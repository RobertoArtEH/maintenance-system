import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Faculty from 'App/Models/Faculty'

export default class FacultySeeder extends BaseSeeder {
  public async run () {
    await Faculty.createMany([
      { id: 1, name: 'ver' },
      { id: 2, name: 'crear' },
      { id: 3, name: 'editar' },
      { id: 4, name: 'cancelar' },
      { id: 5, name: 'autorizar' },
      { id: 6, name: 'rechazar' },
      { id: 7, name: 'finalizar' },
    ])
  }
}

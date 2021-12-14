import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Laboratory from 'App/Models/Laboratory'

export default class LaboratorySeeder extends BaseSeeder {
  public async run () {
    await Laboratory.createMany([
      { name: 'Laboratorio A' },
      { name: 'Laboratorio B' },
      { name: 'Laboratorio C' },
    ])
  }
}

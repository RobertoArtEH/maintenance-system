import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Status from 'App/Models/Status'

export default class StatusSeeder extends BaseSeeder {
  public async run () {
    await Status.createMany([
      { name: 'Pendiente' },
      { name: 'Aceptado' },
      { name: 'Finalizado' },
      { name: 'Cancelado' },
    ])
  }
}

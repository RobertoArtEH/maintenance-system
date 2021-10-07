import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    await User.createMany([
      {
        name: 'Admin',
        lastName: 'Admin',
        roleId: 1,
        careerId: 1,
        shiftId: 3,
        email: 'admin@ut.com',
        password: 'pssword',
      },
    ])
  }
}

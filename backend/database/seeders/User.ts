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
      {
        name: 'Confianza',
        lastName: 'Confianza',
        roleId: 2,
        careerId: 1,
        shiftId: 3,
        email: 'confianza@gmail.com',
        password: 'password',
      },
      {
        name: 'Tecnico',
        lastName: 'Tecnico',
        roleId: 3,
        careerId: 1,
        shiftId: 3,
        email: 'tecnico@gmail.com',
        password: 'password',
      },
      {
        name: 'AsistenteSistemas',
        lastName: 'AsistenteSistmas',
        roleId: 4,
        careerId: 1,
        shiftId: 3,
        email: 'asistente_sistemas@gmail.com',
        password: 'password',
      },
      {
        name: 'ResponsableArea',
        lastName: 'ResponsableArea',
        roleId: 5,
        careerId: 1,
        shiftId: 3,
        email: 'responsable_area@gmail.com',
        password: 'password',
      },
      {
        name: 'Coordinador',
        lastName: 'Coordinador',
        roleId: 6,
        careerId: 1,
        shiftId: 3,
        email: 'coordinador@gmail.com',
        password: 'password',
      },
      {
        name: 'Asistente',
        lastName: 'Asistente',
        roleId: 7,
        careerId: 1,
        shiftId: 3,
        email: 'asistente@gmail.com',
        password: 'password',
      },
    ])
  }
}

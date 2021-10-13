import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import RolePageFaculty from 'App/Models/RolePageFaculty'

export default class RolePageFacultySeeder extends BaseSeeder {
  public async run () {
    await RolePageFaculty.createMany([
      /** Usuarios - ver, crear, editar */
      { pageId: 1, roleId: 1, facultyId: 1 },
      { pageId: 1, roleId: 1, facultyId: 2 },
      { pageId: 1, roleId: 1, facultyId: 3 },

      /** Solicitudes - crear */
      { pageId: 2, roleId: 5, facultyId: 2 },
      { pageId: 2, roleId: 6, facultyId: 2 },
      /** Solicitudes - autorizar */
      { pageId: 2, roleId: 1, facultyId: 5 },
      { pageId: 2, roleId: 2, facultyId: 5 },
      /** Solicitudes - cancelar */
      { pageId: 2, roleId: 5, facultyId: 4 },
      { pageId: 2, roleId: 6, facultyId: 4 },
      { pageId: 2, roleId: 7, facultyId: 4 },
      /** Solicitudes - finalizar */
      { pageId: 2, roleId: 5, facultyId: 7 },
      { pageId: 2, roleId: 6, facultyId: 7 },
      { pageId: 2, roleId: 7, facultyId: 7 },
    ])
  }
}

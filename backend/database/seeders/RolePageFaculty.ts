import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import RolePageFaculty from 'App/Models/RolePageFaculty'

export default class RolePageFacultySeeder extends BaseSeeder {
  public async run () {
    await RolePageFaculty.createMany([
      /** Usuarios - ver, crear, editar */
      { pageId: 1, roleId: 1, facultyId: 1 },
      { pageId: 1, roleId: 1, facultyId: 2 },
      { pageId: 1, roleId: 1, facultyId: 3 },

      /** Solicitudes - ver */
      { pageId: 2, roleId: 1, facultyId: 1 },
      { pageId: 2, roleId: 2, facultyId: 1 },
      { pageId: 2, roleId: 5, facultyId: 1 },
      { pageId: 2, roleId: 6, facultyId: 1 },
      { pageId: 2, roleId: 7, facultyId: 1 },
      /** Solicitudes - crear */
      { pageId: 2, roleId: 5, facultyId: 2 },
      { pageId: 2, roleId: 6, facultyId: 2 },
      /** Solicitudes - editar */
      { pageId: 2, roleId: 5, facultyId: 3 },
      { pageId: 2, roleId: 6, facultyId: 3 },
      /** Solicitudes - autorizar */
      { pageId: 2, roleId: 1, facultyId: 5 },
      { pageId: 2, roleId: 2, facultyId: 5 },
      { pageId: 2, roleId: 3, facultyId: 5 },
      { pageId: 2, roleId: 4, facultyId: 5 },
      /** Solicitudes - cancelar */
      { pageId: 2, roleId: 5, facultyId: 4 },
      { pageId: 2, roleId: 6, facultyId: 4 },
      { pageId: 2, roleId: 7, facultyId: 4 },
      /** Solicitudes - rechazar */
      { pageId: 2, roleId: 1, facultyId: 6 },
      { pageId: 2, roleId: 2, facultyId: 6 },
      { pageId: 2, roleId: 3, facultyId: 6 },
      { pageId: 2, roleId: 4, facultyId: 6 },
      /** Solicitudes - finalizar */
      { pageId: 2, roleId: 5, facultyId: 7 },
      { pageId: 2, roleId: 6, facultyId: 7 },
      { pageId: 2, roleId: 7, facultyId: 7 },

      /** Calendario - crear */
      { pageId: 3, roleId: 1, facultyId: 2 },
      /** Calendario - ver */
      { pageId: 3, roleId: 5, facultyId: 1 },

      /** Mantenimiento - ver */
      { pageId: 4, roleId: 1, facultyId: 1 },
      { pageId: 4, roleId: 2, facultyId: 1 },
      { pageId: 4, roleId: 3, facultyId: 1 },
      { pageId: 4, roleId: 4, facultyId: 1 },
      { pageId: 4, roleId: 5, facultyId: 1 },
      { pageId: 4, roleId: 6, facultyId: 1 },
      { pageId: 4, roleId: 7, facultyId: 1 },
      /** Mantenimiento - crear */
      { pageId: 4, roleId: 5, facultyId: 2 },
      { pageId: 4, roleId: 6, facultyId: 2 },
      /** Mantenimiento - editar */
      { pageId: 4, roleId: 5, facultyId: 3 },
      { pageId: 4, roleId: 6, facultyId: 3 },
      /** Mantenimiento - autorizar */
      { pageId: 4, roleId: 1, facultyId: 5 },
      { pageId: 4, roleId: 2, facultyId: 5 },
      { pageId: 4, roleId: 3, facultyId: 6 },
      { pageId: 4, roleId: 4, facultyId: 6 },
      /** Mantenimiento - rechazar */
      { pageId: 4, roleId: 1, facultyId: 6 },
      { pageId: 4, roleId: 2, facultyId: 6 },
      { pageId: 4, roleId: 3, facultyId: 6 },
      { pageId: 4, roleId: 4, facultyId: 6 },
      /** Mantenimiento - cancelar */
      { pageId: 4, roleId: 5, facultyId: 4 },
      { pageId: 4, roleId: 6, facultyId: 4 },
      { pageId: 4, roleId: 7, facultyId: 4 },
      /** Mantenimiento - finalizar */
      { pageId: 4, roleId: 5, facultyId: 7 },
      { pageId: 4, roleId: 6, facultyId: 7 },
      { pageId: 4, roleId: 7, facultyId: 7 },
    ])
  }
}

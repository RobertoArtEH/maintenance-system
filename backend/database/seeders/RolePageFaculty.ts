import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import RolePageFaculty from 'App/Models/RolePageFaculty'
import { Constants as c } from '../../constants'

export default class RolePageFacultySeeder extends BaseSeeder {
  public async run () {
    await RolePageFaculty.createMany([
      /** Usuarios - ver, crear, editar */
      { pageId: 1, roleId: c.ROLE_SYSTEM_MANAGER, facultyId: 1 },
      { pageId: 1, roleId: c.ROLE_SYSTEM_MANAGER, facultyId: 2 },
      { pageId: 1, roleId: c.ROLE_SYSTEM_MANAGER, facultyId: 3 },

      /** Solicitudes - ver */
      { pageId: 2, roleId: c.ROLE_SYSTEM_MANAGER, facultyId: 1 },
      { pageId: 2, roleId: c.ROLE_TRUST, facultyId: 1 },
      { pageId: 2, roleId: c.ROLE_AREA_RESPONSIBLE, facultyId: 1 },
      { pageId: 2, roleId: c.ROLE_COORDINATOR, facultyId: 1 },
      { pageId: 2, roleId: c.ROLE_ASSISTANT, facultyId: 1 },
      /** Solicitudes - crear */
      { pageId: 2, roleId: c.ROLE_AREA_RESPONSIBLE, facultyId: 2 },
      { pageId: 2, roleId: c.ROLE_COORDINATOR, facultyId: 2 },
      /** Solicitudes - editar */
      { pageId: 2, roleId: c.ROLE_AREA_RESPONSIBLE, facultyId: 3 },
      { pageId: 2, roleId: c.ROLE_COORDINATOR, facultyId: 3 },
      /** Solicitudes - autorizar */
      { pageId: 2, roleId: c.ROLE_SYSTEM_MANAGER, facultyId: 5 },
      { pageId: 2, roleId: c.ROLE_TRUST, facultyId: 5 },
      { pageId: 2, roleId: c.ROLE_TECHNICAL, facultyId: 5 },
      { pageId: 2, roleId: c.ROLE_SYSTEM_ASSISTANT, facultyId: 5 },
      /** Solicitudes - cancelar */
      { pageId: 2, roleId: c.ROLE_AREA_RESPONSIBLE, facultyId: 4 },
      { pageId: 2, roleId: c.ROLE_COORDINATOR, facultyId: 4 },
      { pageId: 2, roleId: c.ROLE_ASSISTANT, facultyId: 4 },
      /** Solicitudes - rechazar */
      { pageId: 2, roleId: c.ROLE_SYSTEM_MANAGER, facultyId: 6 },
      { pageId: 2, roleId: c.ROLE_TRUST, facultyId: 6 },
      { pageId: 2, roleId: c.ROLE_TECHNICAL, facultyId: 6 },
      { pageId: 2, roleId: c.ROLE_SYSTEM_ASSISTANT, facultyId: 6 },
      /** Solicitudes - finalizar */
      { pageId: 2, roleId: c.ROLE_AREA_RESPONSIBLE, facultyId: 7 },
      { pageId: 2, roleId: c.ROLE_COORDINATOR, facultyId: 7 },
      { pageId: 2, roleId: c.ROLE_ASSISTANT, facultyId: 7 },

      /** Calendario - crear */
      { pageId: 3, roleId: c.ROLE_SYSTEM_MANAGER, facultyId: 2 },
      { pageId: 3, roleId: c.ROLE_TECH_SERVICES_HEAD, facultyId: 2 },
      /** Calendario - ver */
      { pageId: 3, roleId: c.ROLE_AREA_RESPONSIBLE, facultyId: 1 },
      { pageId: 3, roleId: c.ROLE_TECH_SERVICES_HEAD, facultyId: 1 },
      { pageId: 3, roleId: c.ROLE_LABORATORY_AUXILIAR, facultyId: 1 },

      /** Mantenimiento - ver */
      { pageId: 4, roleId: c.ROLE_SYSTEM_MANAGER, facultyId: 1 },
      { pageId: 4, roleId: c.ROLE_TRUST, facultyId: 1 },
      { pageId: 4, roleId: c.ROLE_TECHNICAL, facultyId: 1 },
      { pageId: 4, roleId: c.ROLE_SYSTEM_ASSISTANT, facultyId: 1 },
      { pageId: 4, roleId: c.ROLE_AREA_RESPONSIBLE, facultyId: 1 },
      { pageId: 4, roleId: c.ROLE_COORDINATOR, facultyId: 1 },
      { pageId: 4, roleId: c.ROLE_ASSISTANT, facultyId: 1 },
      /** Mantenimiento - crear */
      { pageId: 4, roleId: c.ROLE_AREA_RESPONSIBLE, facultyId: 2 },
      { pageId: 4, roleId: c.ROLE_COORDINATOR, facultyId: 2 },
      /** Mantenimiento - editar */
      { pageId: 4, roleId: c.ROLE_AREA_RESPONSIBLE, facultyId: 3 },
      { pageId: 4, roleId: c.ROLE_COORDINATOR, facultyId: 3 },
      /** Mantenimiento - autorizar */
      { pageId: 4, roleId: c.ROLE_SYSTEM_MANAGER, facultyId: 5 },
      { pageId: 4, roleId: c.ROLE_TRUST, facultyId: 5 },
      { pageId: 4, roleId: c.ROLE_TECHNICAL, facultyId: 6 },
      { pageId: 4, roleId: c.ROLE_SYSTEM_ASSISTANT, facultyId: 6 },
      /** Mantenimiento - rechazar */
      { pageId: 4, roleId: c.ROLE_SYSTEM_MANAGER, facultyId: 6 },
      { pageId: 4, roleId: c.ROLE_TRUST, facultyId: 6 },
      { pageId: 4, roleId: c.ROLE_TECHNICAL, facultyId: 6 },
      { pageId: 4, roleId: c.ROLE_SYSTEM_ASSISTANT, facultyId: 6 },
      /** Mantenimiento - cancelar */
      { pageId: 4, roleId: c.ROLE_AREA_RESPONSIBLE, facultyId: 4 },
      { pageId: 4, roleId: c.ROLE_COORDINATOR, facultyId: 4 },
      { pageId: 4, roleId: c.ROLE_ASSISTANT, facultyId: 4 },
      /** Mantenimiento - finalizar */
      { pageId: 4, roleId: c.ROLE_AREA_RESPONSIBLE, facultyId: 7 },
      { pageId: 4, roleId: c.ROLE_COORDINATOR, facultyId: 7 },
      { pageId: 4, roleId: c.ROLE_ASSISTANT, facultyId: 7 },

      /** Requisiciones - ver */
      { pageId: 5, roleId: c.ROLE_TECH_SERVICES_HEAD, facultyId: 1 },
      /** Requisiciones - crear */
      { pageId: 5, roleId: c.ROLE_TECH_SERVICES_HEAD, facultyId: 2 },
      { pageId: 5, roleId: c.ROLE_LABORATORY_AUXILIAR, facultyId: 2 },
      /** Requisiciones - editar */
      { pageId: 5, roleId: c.ROLE_TECH_SERVICES_HEAD, facultyId: 3 },
      { pageId: 5, roleId: c.ROLE_LABORATORY_AUXILIAR, facultyId: 3 },
    ])
  }
}

import { Injectable } from '@nestjs/common';
import { MenusService, RolesService } from '@auth/services';
import { CreateMenuDto } from '@auth/dto';
import { MenuTypeEnum } from '@auth/enums';
import { MenuEntity } from '@auth/entities';

@Injectable()
export class MenusSeeder {
  constructor(private menusService: MenusService, private rolesService: RolesService) {}

  async run() {
    await this.createMenus();
    await this.createMenuRole();
  }

  async createMenus() {
    let menus: CreateMenuDto[] = [];
    menus.push(
      {
        code: 'admin',
        icon: 'pi pi-users',
        isVisible: true,
        label: 'Administrador',
        order: 1,
        type: MenuTypeEnum.LEFT_SIDE,
      },
      {
        code: 'academic-administrator',
        icon: 'pi pi-users',
        isVisible: true,
        label: 'Administración',
        order: 2,
        type: MenuTypeEnum.LEFT_SIDE,
      },
    );

    for (const menu of menus) {
      await this.menusService.create(menu);
    }

    const menusAll = (await this.menusService.findAll()).data as MenuEntity[];

    const adminMenu = menusAll.find(menu => menu.code === 'admin');

    menus = [];
    menus.push(
      {
        code: 'users',
        icon: 'pi pi-users',
        isVisible: true,
        label: 'Usuarios',
        order: 1,
        routerLink: '/administration/users',
        type: MenuTypeEnum.LEFT_SIDE,
        parent: adminMenu,
      },
      {
        code: 'menus',
        icon: 'pi pi-users',
        isVisible: true,
        label: 'Menus',
        order: 2,
        routerLink: '/administration/menus',
        type: MenuTypeEnum.LEFT_SIDE,
        parent: adminMenu,
      },
    );

    for (const menu of menus) {
      await this.menusService.create(menu);
    }

    const academicAdministration = menusAll.find(menu => menu.code === 'academic-administrator');

    menus = [];
    menus.push(
      {
        code: 'institutions',
        icon: 'pi pi-bars',
        isVisible: true,
        label: 'Instituciones',
        order: 1,
        routerLink: '/core/institutions',
        type: MenuTypeEnum.LEFT_SIDE,
        parent: academicAdministration,
      },
      {
        code: 'careers',
        icon: 'pi pi-bars',
        isVisible: true,
        label: 'Carreras',
        order: 2,
        routerLink: '/core/careers',
        type: MenuTypeEnum.LEFT_SIDE,
        parent: academicAdministration,
      },
      {
        code: 'students',
        icon: 'pi pi-bars',
        isVisible: true,
        label: 'Estudiantes',
        order: 3,
        routerLink: '/core/students',
        type: MenuTypeEnum.LEFT_SIDE,
        parent: academicAdministration,
      },
      {
        code: 'teachers',
        icon: 'pi pi-bars',
        isVisible: true,
        label: 'Docentes',
        order: 4,
        routerLink: '/core/teachers',
        type: MenuTypeEnum.LEFT_SIDE,
        parent: academicAdministration,
      },
      {
        code: 'school-periods',
        icon: 'pi pi-bars',
        isVisible: true,
        label: 'Periodos Lectivos',
        order: 5,
        routerLink: '/core/school-periods',
        type: MenuTypeEnum.LEFT_SIDE,
        parent: academicAdministration,
      },
    );

    for (const menu of menus) {
      await this.menusService.create(menu);
    }
  }

  async createMenuRole() {
    let role = await this.rolesService.findByCode('coordinator-career');

    const menusAll = (await this.menusService.findAll()).data;

    role.menus = menusAll.filter(menu => menu.code === 'academic-administrator');

    await this.rolesService.createMenus(role);

    role = await this.rolesService.findByCode('admin');

    role.menus = menusAll.filter(menu => menu.code === 'admin');

    await this.rolesService.createMenus(role);
  }
}

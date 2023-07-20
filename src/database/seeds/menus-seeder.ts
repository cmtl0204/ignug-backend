import { Injectable } from '@nestjs/common';
import { MenusService } from '@auth/services';
import { CreateMenuDto } from '@auth/dto';
import { MenuTypeEnum } from '@auth/enums';
import { MenuEntity } from '@auth/entities';

@Injectable()
export class MenusSeeder {
  constructor(private menusService: MenusService) {}

  async run() {
    await this.createMenus();
  }

  async createMenus() {
    let menus: CreateMenuDto[] = [];
    menus.push(
      {
        code: 'profile',
        icon: 'pi pi-id-card',
        isVisible: true,
        label: 'Perfil',
        order: 1,
        routerLink: '/profile',
        type: MenuTypeEnum.LEFT_SIDE,
      },
      {
        code: 'administrator',
        icon: 'pi pi-users',
        isVisible: true,
        label: 'Administrador',
        order: 2,
        type: MenuTypeEnum.LEFT_SIDE,
      },
    );

    for (const menu of menus) {
      await this.menusService.create(menu);
    }

    menus = [];
    const menusAll = (await this.menusService.findAll()).data as MenuEntity[];
    const administratorMenu = menusAll.find(
      (menu) => (menu.code = 'administrator'),
    );

    menus.push(
      {
        code: 'users',
        icon: 'pi pi-users',
        isVisible: true,
        label: 'Usuarios',
        order: 1,
        routerLink: '/administration/users',
        type: MenuTypeEnum.LEFT_SIDE,
        parent: administratorMenu,
      },
      {
        code: 'menus',
        icon: 'pi pi-bars',
        isVisible: true,
        label: 'Menus',
        order: 2,
        routerLink: '/administration/menus',
        type: MenuTypeEnum.LEFT_SIDE,
        parent: administratorMenu,
      },
      {
        code: 'careers',
        icon: 'pi pi-bars',
        isVisible: true,
        label: 'Carreras',
        order: 3,
        routerLink: '/core/careers',
        type: MenuTypeEnum.LEFT_SIDE,
        parent: administratorMenu,
      },
      {
        code: 'curriculums',
        icon: 'pi pi-bars',
        isVisible: true,
        label: 'Malla Curricular',
        order: 4,
        routerLink: '/core/curriculums',
        type: MenuTypeEnum.LEFT_SIDE,
        parent: administratorMenu,
      },
      {
        code: 'institutions',
        icon: 'pi pi-bars',
        isVisible: true,
        label: 'Institución',
        order: 5,
        routerLink: '/core/institutions',
        type: MenuTypeEnum.LEFT_SIDE,
        parent: administratorMenu,
      },
      {
        code: 'students',
        icon: 'pi pi-bars',
        isVisible: true,
        label: 'Estudiantes',
        order: 6,
        routerLink: '/core/students',
        type: MenuTypeEnum.LEFT_SIDE,
        parent: administratorMenu,
      },
      {
        code: 'subjects',
        icon: 'pi pi-bars',
        isVisible: true,
        label: 'Asignaturas',
        order: 7,
        routerLink: '/core/subjects',
        type: MenuTypeEnum.LEFT_SIDE,
        parent: administratorMenu,
      },
      {
        code: 'teachers',
        icon: 'pi pi-bars',
        isVisible: true,
        label: 'Docentes',
        order: 8,
        routerLink: '/core/teachers',
        type: MenuTypeEnum.LEFT_SIDE,
        parent: administratorMenu,
      },
      {
        code: 'school-periods',
        icon: 'pi pi-bars',
        isVisible: true,
        label: 'Periodos Lectivos',
        order: 9,
        routerLink: '/core/school-periods',
        type: MenuTypeEnum.LEFT_SIDE,
        parent: administratorMenu,
      },
    );

    for (const menu of menus) {
      await this.menusService.create(menu);
    }
  }
}

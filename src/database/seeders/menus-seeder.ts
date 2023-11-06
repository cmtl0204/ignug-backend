import {Injectable} from '@nestjs/common';
import {MenusService, RolesService} from '@auth/services';
import {CreateMenuDto} from '@auth/dto';
import {MenuTypeEnum, RoleEnum} from '@auth/enums';
import {MenuEntity} from '@auth/entities';
import {PrimeIcons} from "../../shared/enums/prime-icons.enum";

@Injectable()
export class MenusSeeder {
    constructor(private menusService: MenusService, private rolesService: RolesService) {
    }

    async run() {
        await this.createMenus();
        await this.createMenuRole();
    }

    private async createMenus() {
        let menus: CreateMenuDto[] = [];
        menus.push(
            {
                code: 'admin',
                icon: PrimeIcons.USER,
                isVisible: true,
                label: 'Administrador',
                order: 1,
                type: MenuTypeEnum.LEFT_SIDE,
            },
            {
                code: 'academic-administrator',
                icon: PrimeIcons.SITEMAP,
                isVisible: true,
                label: 'Administración',
                order: 1,
                type: MenuTypeEnum.LEFT_SIDE,
            },
            {
                code: 'enrollments',
                icon: PrimeIcons.VERIFIED,
                isVisible: true,
                label: 'Matrículas',
                order: 1,
                type: MenuTypeEnum.LEFT_SIDE,
            },
            {
                code: 'inscriptions',
                icon: PrimeIcons.SHIELD,
                isVisible: true,
                label: 'Inscripciones',
                order: 1,
                type: MenuTypeEnum.LEFT_SIDE,
            },
            {
                code: 'students',
                icon: PrimeIcons.ID_CARD,
                isVisible: true,
                label: 'Estudiante',
                order: 1,
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
                code: 'curriculums',
                icon: 'pi pi-list',
                isVisible: true,
                label: 'Mallas Curriculares',
                order: 2,
                routerLink: '/core/curriculums',
                type: MenuTypeEnum.LEFT_SIDE,
                parent: academicAdministration,
            },
            {
                code: 'teachers',
                icon: 'pi pi-bars',
                isVisible: false,
                label: 'Docentes',
                order: 5,
                routerLink: '/core/teachers',
                type: MenuTypeEnum.LEFT_SIDE,
                parent: academicAdministration,
            },
            {
                code: 'school-periods',
                icon: 'pi pi-bars',
                isVisible: true,
                label: 'Periodos Lectivos',
                order: 6,
                routerLink: '/core/school-periods',
                type: MenuTypeEnum.LEFT_SIDE,
                parent: academicAdministration,
            },
            {
                code: 'consolidated-grades',
                icon: 'pi pi-bars',
                isVisible: false,
                label: 'Consolidado de notas',
                order: 8,
                routerLink: '/core/consolidated-notes ',
                type: MenuTypeEnum.LEFT_SIDE,
                parent: academicAdministration,
            },
        );

        const reviewerMenu = menusAll.find(menu => menu.code === 'inscriptions');
        menus.push(
            {
                code: 'inscription-list',
                icon: 'pi pi-users',
                isVisible: true,
                label: 'Administración de Inscripciones',
                order: 1,
                routerLink: '/core/inscriptions',
                type: MenuTypeEnum.LEFT_SIDE,
                parent: reviewerMenu,
            },
        );

        const secretaryMenu = menusAll.find(menu => menu.code === 'enrollments');

        menus.push(
            {
                code: 'enrollment-list',
                icon: 'pi pi-users',
                isVisible: true,
                label: 'Administración de Matrículas',
                order: 1,
                routerLink: '/core/enrollments',
                type: MenuTypeEnum.LEFT_SIDE,
                parent: secretaryMenu,
            },
        );

        const studentMenu = menusAll.find(menu => menu.code === 'students');

        menus.push(
            {
                code: 'enrollment-application',
                icon: 'pi pi-users',
                isVisible: true,
                label: 'Solicitud de Matrícula',
                order: 1,
                routerLink: '/core/enrollment-application',
                type: MenuTypeEnum.LEFT_SIDE,
                parent: studentMenu,
            },
            {
                code: 'enrollment-subjects',
                icon: 'pi pi-users',
                isVisible: true,
                label: 'Asignaturas',
                order: 2,
                routerLink: '/core/student/enrollment-subjects',
                type: MenuTypeEnum.LEFT_SIDE,
                parent: studentMenu,
            },
        );

        for (const menu of menus) {
            await this.menusService.create(menu);
        }
    }

    private async createMenuRole() {
        const menusAll = (await this.menusService.findAll()).data;

        let role = await this.rolesService.findByCode(RoleEnum.COORDINATOR_CAREER);
        role.menus = menusAll.filter(menu => menu.code === 'academic-administrator');
        await this.rolesService.createMenus(role);

        role = await this.rolesService.findByCode(RoleEnum.ADMIN);
        role.menus = menusAll.filter(menu => menu.code === 'admin');
        await this.rolesService.createMenus(role);

        role = await this.rolesService.findByCode(RoleEnum.REVIEWER);
        role.menus = menusAll.filter(menu => menu.code === 'inscriptions');
        await this.rolesService.createMenus(role);

        role = await this.rolesService.findByCode(RoleEnum.SECRETARY);
        role.menus = menusAll.filter(menu => menu.code === 'enrollments');
        await this.rolesService.createMenus(role);

        role = await this.rolesService.findByCode(RoleEnum.STUDENT);
        role.menus = menusAll.filter(menu => menu.code === 'students');
        await this.rolesService.createMenus(role);
    }
}

import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { SeedTeacherDistributionDto } from '@core/dto';
import { CatalogueEntity } from '@core/entities';
import { CataloguesService, CurriculumsService, SchoolPeriodsService, SubjectsService, TeacherDistributionsService, TeachersService } from '@core/services';
import { CatalogueCoreTypeEnum } from '@shared/enums';

@Injectable()
export class TeacherDistributionsSeeder {
  constructor(
    private schoolPeriodsService: SchoolPeriodsService,
    private cataloguesService: CataloguesService,
    private subjectsService: SubjectsService,
    private curriculumsService: CurriculumsService,
    private teachersService: TeachersService,
    private teacherDistributionsService: TeacherDistributionsService,
  ) {}

  async run() {
    await this.create();
  }

  private async create() {
    const teacherDistributions: SeedTeacherDistributionDto[] = [];

    const catalogues = await this.cataloguesService.findCache();
    const parallels = catalogues.filter((item: CatalogueEntity) => item.type === CatalogueCoreTypeEnum.PARALLEL);
    const workdays = catalogues.filter((item: CatalogueEntity) => item.type === CatalogueCoreTypeEnum.ENROLLMENTS_WORKDAY);
    const schoolPeriod = await this.schoolPeriodsService.findOpenSchoolPeriod();
    const curriculums = (await this.curriculumsService.findAll()).data;
    const subjects = await this.curriculumsService.findSubjectsAllByCurriculum(curriculums[0].id);
    const teachers = (await this.teachersService.findAll()).data;

    subjects.forEach(subject => {
      teacherDistributions.push({
        parallel: parallels[faker.helpers.rangeToNumber({ min: 0, max: parallels.length - 1 })],
        schoolPeriod: schoolPeriod,
        subject: subject,
        teacher: teachers[faker.helpers.rangeToNumber({ min: 0, max: teachers.length - 1 })],
        workday: workdays[faker.helpers.rangeToNumber({ min: 0, max: workdays.length - 1 })],
        hours: faker.helpers.rangeToNumber({ min: 2, max: 6 }),
      });
    });

    for (const item of teacherDistributions) {
      await this.teacherDistributionsService.create(item);
    }
  }
}

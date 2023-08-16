import { Injectable } from '@nestjs/common';
import { InformationTeachersService, TeachersService } from '@core/services';
import { UsersService } from '@auth/services';
import { UserEntity } from '@auth/entities';
import { SeedTeacherDto } from '@core/dto';
import { TeacherEntity } from '@core/entities';
import { SeederInformationTeacherDto } from '@core/dto';
import { RoleEnum } from '@auth/enums';

@Injectable()
export class TeachersSeeder {
  constructor(private teachersService: TeachersService, private informationTeachersService: InformationTeachersService, private usersService: UsersService) {}

  async run() {
    await this.createTeachers();
    await this.createInformationTeachers();
  }

  async createTeachers() {
    const teachers: SeedTeacherDto[] = [];
    let users = (await this.usersService.findAll()).data;

    users = users.filter((user: UserEntity) => user.roles.some(role => role.code === RoleEnum.TEACHER));

    users.forEach((user: UserEntity) => {
      teachers.push({
        user: user,
      });
    });

    for (const item of teachers) {
      await this.teachersService.create(item);
    }
  }

  async createInformationTeachers() {
    const informationTeachers: SeederInformationTeacherDto[] = [];
    const teachers = (await this.teachersService.findAll()).data;

    teachers.forEach((teacher: TeacherEntity) => {
      informationTeachers.push({
        teacher: teacher,
      });
    });

    for (const item of informationTeachers) {
      await this.informationTeachersService.create(item);
    }
  }
}

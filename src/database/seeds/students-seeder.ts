import { Injectable } from '@nestjs/common';
import { InformationStudentsService, StudentsService } from '@core/services';
import { UsersService } from '@auth/services';
import { UserEntity } from '@auth/entities';
import { SeedStudentDto } from '@core/dto';
import { StudentEntity } from '@core/entities';
import { SeederInformationStudentDto } from '@core/dto';
import { RoleEnum } from '@auth/enums';

@Injectable()
export class StudentsSeeder {
  constructor(private studentsService: StudentsService, private informationStudentsService: InformationStudentsService, private usersService: UsersService) {}

  async run() {
    await this.createStudents();
    await this.createInformationStudents();
  }

  private async createStudents() {
    const students: SeedStudentDto[] = [];
    let users = (await this.usersService.findAll()).data;

    users = users.filter((user: UserEntity) => user.roles.some(role => role.code === RoleEnum.STUDENT));

    users.forEach((user: UserEntity) => {
      students.push({ user: user });
    });

    for (const item of students) {
      await this.studentsService.create(item);
    }
  }

  private async createInformationStudents() {
    const informationStudents: SeederInformationStudentDto[] = [];
    const students = (await this.studentsService.findAll()).data;

    students.forEach((student: StudentEntity) => {
      informationStudents.push({
        student: student,
      });
    });

    for (const item of informationStudents) {
      await this.informationStudentsService.create(item);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InformationStudentsService, StudentsService } from '@core/services';
import { UsersService } from '@auth/services';
import { UserEntity } from '@auth/entities';
import { CreateStudentDto } from '@core/dto';
import { StudentEntity } from '@core/entities';
import { SeederInformationStudentDto } from '@core/dto';

@Injectable()
export class StudentsSeeder {
  constructor(private studentsService: StudentsService, private informationStudentsService: InformationStudentsService, private usersService: UsersService) {}

  async run() {
    await this.createStudents();
  }

  async createStudents() {
    const students: CreateStudentDto[] = [];
    const users = (await this.usersService.findAll()).data;

    users.forEach((user: UserEntity) => {
      students.push({
        user: user,
        informationStudent: null,
      });
    });

    for (const item of students) {
      await this.studentsService.create(item);
    }
  }

  async createInformationStudents() {
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

import { Injectable } from '@nestjs/common';
import { CreateClassroomDto} from '@core/dto';
import { ClassroomsService,EnrollmentsDetailService, EnrollmentsService } from '@core/services';
import { EnrollmentDetailEntity, EnrollmentEntity} from '@core/entities';


@Injectable()
export class ClassroomSeeder {

  private enrollmentsDetail: EnrollmentDetailEntity[] = [];
  
  constructor(
  private classroomsService: ClassroomsService,
  private enrollmentDetailsService: EnrollmentsDetailService, 
  private enrollmentsService: EnrollmentsService) {}

  async run() {
    await this.create();
  }


  async create() {
    const classrooms: CreateClassroomDto[] = [];
    const enrollmentsDetail = (await this.enrollmentDetailsService.findAll()).data as EnrollmentDetailEntity[];

    //enrollments detail
    const enrollmentDetail1 = this.enrollmentsDetail.find((enrollmentDetail: EnrollmentDetailEntity) => enrollmentDetail.number === 1);

    const enrollmentDetail2 = this.enrollmentsDetail.find((enrollmentDetail: EnrollmentDetailEntity) => enrollmentDetail.number === 2);
  
    classrooms.push(
      {
        value: 2,
        enrollmentDetail: enrollmentDetail1
      },
      {
        value: 5,
        enrollmentDetail: enrollmentDetail2
      }
    );

    for (const item of classrooms) {
      await this.classroomsService.create(item);
    }
  }
}

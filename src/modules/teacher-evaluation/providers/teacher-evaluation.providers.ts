import { DataSource } from 'typeorm';
import { ConfigEnum, CoreRepositoryEnum, TeacherEvaluationRepositoryEnum } from '@shared/enums';
import { QuestionEntity } from '../entities/question.entity';
import { ResponseEntity } from '../entities/response.entity';
import { ResultEntity } from '../entities/result.entity';
import { StudentEvaluationEntity } from '../entities/student-evaluation.entity';
import { TeacherEvaluationEntity } from '../entities/teacher-evaluation.entity';

export const teacherEvaluationProviders = [
  {
    provide: TeacherEvaluationRepositoryEnum.QUESTION_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(QuestionEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: TeacherEvaluationRepositoryEnum.RESPONSE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ResponseEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: TeacherEvaluationRepositoryEnum.RESULT_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ResultEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: TeacherEvaluationRepositoryEnum.STUDENT_EVALUATION_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(StudentEvaluationEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
  {
    provide: TeacherEvaluationRepositoryEnum.TEACHER_EVALUATION_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TeacherEvaluationEntity),
    inject: [ConfigEnum.PG_DATA_SOURCE],
  },
];

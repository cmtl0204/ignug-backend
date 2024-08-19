import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {Repository, SelectQueryBuilder} from 'typeorm';
import {
    CareerEntity,
    CatalogueEntity, EnrollmentDetailEntity, EnrollmentDetailStateEntity,
    EnrollmentEntity,
    EnrollmentStateEntity, InformationStudentEntity, LocationEntity,
    OriginAddressEntity, ResidenceAddressEntity, SchoolPeriodEntity,
    StudentEntity,
} from '@core/entities';
import {
    AuthRepositoryEnum,
    CatalogueEnrollmentStateEnum,
    CatalogueTypeEnum,
    CoreRepositoryEnum,
    TeacherEvaluationRepositoryEnum
} from '@shared/enums';
import {UserEntity} from '@auth/entities';
import {CataloguesService} from '@core/services';
import {AutoEvaluationEntity} from "../../teacher-evaluation/entities/auto-evaluation.entity";
import {CoordinatorEvaluationEntity} from "../../teacher-evaluation/entities/coordinator-evaluation.entity";
import {StudentEvaluationEntity} from "../../teacher-evaluation/entities/student-evaluation.entity";
import {PartnerEvaluationEntity} from "../../teacher-evaluation/entities/partner-evaluation.entity";

@Injectable()
export class TeacherEvaluationSqlService {
    constructor(
        @Inject(AuthRepositoryEnum.USER_REPOSITORY) private readonly userRepository: Repository<UserEntity>,
        @Inject(CoreRepositoryEnum.SCHOOL_PERIOD_REPOSITORY) private readonly schoolPeriodRepository: Repository<SchoolPeriodEntity>,
        @Inject(TeacherEvaluationRepositoryEnum.AUTO_EVALUATION_REPOSITORY) private readonly autoEvaluationRepository: Repository<AutoEvaluationEntity>,
        @Inject(TeacherEvaluationRepositoryEnum.PARTNER_EVALUATION_REPOSITORY) private readonly partnerEvaluationRepository: Repository<PartnerEvaluationEntity>,
        @Inject(TeacherEvaluationRepositoryEnum.STUDENT_EVALUATION_REPOSITORY) private readonly studentEvaluationRepository: Repository<StudentEvaluationEntity>,
        @Inject(TeacherEvaluationRepositoryEnum.COORDINATOR_EVALUATION_REPOSITORY) private readonly coordinatorEvaluationRepository: Repository<CoordinatorEvaluationEntity>,
        private readonly cataloguesService: CataloguesService,
    ) {
    }

    async findIntegralEvaluation(evaluatedId: string, schoolPeriodId: string): Promise<any> {
        const evaluated = await this.userRepository.findOne({
            relations: {teacher: {careerToTeachers: {career: true}}},
            where: {id: evaluatedId, teacher: {careerToTeachers: {isCurrent: true}}}
        });

        const schoolPeriod = await this.schoolPeriodRepository.findOne({
            where: {id: schoolPeriodId}
        });

        const autoEvaluation = await this.autoEvaluationRepository.findOne({
            where: {evaluatedId, schoolPeriodId}
        });

        const partnerEvaluation = await this.partnerEvaluationRepository.findOne({
            where: {evaluatedId, schoolPeriodId}
        });

        const coordinatorEvaluation = await this.coordinatorEvaluationRepository.findOne({
            where: {evaluatedId, schoolPeriodId}
        });

        const studentEvaluation = await this.studentEvaluationRepository.createQueryBuilder('student_evaluations')
            .select('AVG(student_evaluations.total_score)', 'totalScore')
            .where('evaluated_id = :evaluatedId and school_period_id = :schoolPeriodId and student_evaluations.total_score is not null',
                {evaluatedId, schoolPeriodId})
            .getRawOne();

        const autoEvaluationScore = (autoEvaluation?.totalScore / 14).toFixed(2);
        const studentEvaluationScore = (studentEvaluation?.totalScore * (4 / 11)).toFixed(2);
        const partnerEvaluationScore = (partnerEvaluation?.totalScore * (5 / 28)).toFixed(2);
        const coordinatorScore = (coordinatorEvaluation?.totalScore * (5 / 23)).toFixed(2);

        let totalScore = null;

        console.log('autoEvaluationScore', autoEvaluationScore);
        console.log('studentEvaluationScore', studentEvaluationScore);
        console.log('partnerEvaluationScore', partnerEvaluationScore);
        console.log('coordinatorScore', coordinatorScore);
        if (autoEvaluationScore && partnerEvaluation && coordinatorEvaluation && studentEvaluationScore) {
            totalScore = autoEvaluationScore + partnerEvaluation + coordinatorEvaluation + studentEvaluationScore;
        }

        return {
            evaluated,
            schoolPeriod,
            autoEvaluationScore,
            partnerEvaluationScore,
            coordinatorScore,
            studentEvaluationScore,
            totalScore,
        };
    }
}

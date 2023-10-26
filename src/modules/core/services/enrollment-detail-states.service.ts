import {Inject, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {CreateEnrollmentStateDto, SeedEnrollmentStateDto} from "@core/dto";
import {EnrollmentDetailStateEntity} from "@core/entities";
import {CoreRepositoryEnum} from '@shared/enums';

@Injectable()
export class EnrollmentsStateService {
    constructor(
        @Inject(CoreRepositoryEnum.ENROLLMENT_DETAIL_STATE_REPOSITORY)
        private repository: Repository<EnrollmentDetailStateEntity>,
    ) {
    }

    async create(payload: CreateEnrollmentStateDto | SeedEnrollmentStateDto): Promise<EnrollmentDetailStateEntity> {
        const newEntity = this.repository.create(payload);
        newEntity.enrollmentDetailId = payload.enrollmentId;
        newEntity.stateId = payload.stateId;

        return await this.repository.save(newEntity);
    }
}

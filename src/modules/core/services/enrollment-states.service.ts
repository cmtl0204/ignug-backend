import {Inject, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {CreateEnrollmentStateDto, SeedEnrollmentStateDto} from "@core/dto";
import {EnrollmentStateEntity} from "@core/entities";
import {CoreRepositoryEnum} from '@shared/enums';

@Injectable()
export class EnrollmentStatesService {
    constructor(
        @Inject(CoreRepositoryEnum.ENROLLMENT_STATE_REPOSITORY)
        private repository: Repository<EnrollmentStateEntity>,
    ) {
    }

    async create(payload: CreateEnrollmentStateDto | SeedEnrollmentStateDto): Promise<EnrollmentStateEntity> {
        const newEntity = this.repository.create(payload);
        newEntity.enrollmentId = payload.enrollmentId;
        newEntity.stateId = payload.stateId;

        return await this.repository.save(newEntity);
    }
}

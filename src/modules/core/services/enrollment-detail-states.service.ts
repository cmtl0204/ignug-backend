import {Inject, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {CreateEnrollmentsDetailDto, CreateEnrollmentStateDto, SeedEnrollmentStateDto} from "@core/dto";
import {EnrollmentDetailStateEntity, EnrollmentStateEntity} from "@core/entities";
import {CatalogueEnrollmentStateEnum, CoreRepositoryEnum} from '@shared/enums';
import {CreateEnrollmentDetailStateDto} from "../dto/enrollment-detail-states/create-enrollment-detail-state.dto";

@Injectable()
export class EnrollmentDetailStatesService {
    constructor(
        @Inject(CoreRepositoryEnum.ENROLLMENT_DETAIL_STATE_REPOSITORY)
        private repository: Repository<EnrollmentDetailStateEntity>,
    ) {
    }

    async create(payload: CreateEnrollmentDetailStateDto): Promise<EnrollmentDetailStateEntity> {
        const newEntity = this.repository.create(payload);
        newEntity.enrollmentDetailId = payload.enrollmentDetailId;
        newEntity.stateId = payload.stateId;

        return await this.repository.save(newEntity);
    }

    async removeAll(payload: EnrollmentDetailStateEntity[]): Promise<EnrollmentDetailStateEntity[]> {
        return await this.repository.softRemove(payload);
    }

    async removeRequestSent(payload: EnrollmentDetailStateEntity[]): Promise<EnrollmentDetailStateEntity> {
        const requestSent = payload.find(enrollmentState => enrollmentState.state.code === CatalogueEnrollmentStateEnum.REQUEST_SENT);
        return await this.repository.softRemove(requestSent);
    }

    async removeApproved(payload: EnrollmentDetailStateEntity[]): Promise<EnrollmentDetailStateEntity> {
        const approved = payload.find(enrollmentState => enrollmentState.state.code === CatalogueEnrollmentStateEnum.APPROVED);
        return await this.repository.softRemove(approved);
    }

    async removeRejected(enrollmentStates: EnrollmentDetailStateEntity[]): Promise<EnrollmentDetailStateEntity> {
        console.log(enrollmentStates);
        const rejected = enrollmentStates.find(enrollmentState => enrollmentState.state.code === CatalogueEnrollmentStateEnum.REJECTED);
        if (!rejected) {
            return null;
        }

        return await this.repository.softRemove(rejected);
    }
}

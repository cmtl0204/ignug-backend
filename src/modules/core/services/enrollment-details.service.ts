import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {Repository, FindOptionsWhere, ILike, LessThan} from 'typeorm';
import {CreateEnrollmentsDetailDto, FilterEnrollmentsDetailDto, UpdateEnrollmentsDetailDto} from '@core/dto';
import {EnrollmentDetailEntity} from '@core/entities';
import {PaginationDto} from '@core/dto';
import {ServiceResponseHttpModel} from '@shared/models';
import {CoreRepositoryEnum} from '@shared/enums';

@Injectable()
export class EnrollmentDetailsService {
    constructor(
        @Inject(CoreRepositoryEnum.ENROLLMENT_DETAIL_REPOSITORY)
        private repository: Repository<EnrollmentDetailEntity>,
    ) {
    }

    async create(payload: CreateEnrollmentsDetailDto): Promise<EnrollmentDetailEntity> {
        const newEnrollmentDetail = this.repository.create(payload);

        return await this.repository.save(newEnrollmentDetail);
    }

    async findAll(params?: FilterEnrollmentsDetailDto): Promise<ServiceResponseHttpModel> {
        //Pagination & Filter by search
        if (params?.limit > 0 && params?.page >= 0) {
            return await this.paginateAndFilter(params);
        }

        //Other filters
        // if (params.number) {
        //   return this.filterByNumber(params.number);
        // }

        //All
        const data = await this.repository.findAndCount({
            relations: {subject: true},
        });

        return {data: data[0], pagination: {totalItems: data[1], limit: 10}};
    }

    async findOne(id: string): Promise<EnrollmentDetailEntity> {
        const enrollmentDetail = await this.repository.findOne({
            relations: {subject: true},
            where: {id},
        });

        if (!enrollmentDetail) {
            throw new NotFoundException('Enrollment detail not found');
        }

        return enrollmentDetail;
    }

    async update(id: string, payload: UpdateEnrollmentsDetailDto): Promise<EnrollmentDetailEntity> {
        const enrollmentDetail = await this.repository.findOneBy({id});

        if (!enrollmentDetail) {
            throw new NotFoundException('enrollmentDetail not found');
        }

        this.repository.merge(enrollmentDetail, payload);

        return await this.repository.save(enrollmentDetail);
    }

    async remove(id: string): Promise<EnrollmentDetailEntity> {
        const enrollmentDetail = await this.repository.findOneBy({id});

        if (!enrollmentDetail) {
            throw new NotFoundException('enrollmentDetail not found');
        }

        return await this.repository.save(enrollmentDetail);
    }

    async removeAll(payload: EnrollmentDetailEntity[]): Promise<EnrollmentDetailEntity[]> {
        return await this.repository.softRemove(payload);
    }

    private async paginateAndFilter(params: FilterEnrollmentsDetailDto): Promise<ServiceResponseHttpModel> {
        let where: FindOptionsWhere<EnrollmentDetailEntity> | FindOptionsWhere<EnrollmentDetailEntity>[];
        where = {};
        let {page, search} = params;
        const {limit} = params;

        if (search) {
            search = search.trim();
            page = 0;
            where = [];
            where.push({observation: ILike(`%${search}%`)});
        }

        const response = await this.repository.findAndCount({
            where,
            relations: {subject: true},
            skip: PaginationDto.getOffset(limit, page),
            take: limit,
        });

        return {
            data: response[0],
            pagination: {limit, totalItems: response[1]},
        };
    }

    private async filterByNumber(number: number): Promise<ServiceResponseHttpModel> {
        const where: FindOptionsWhere<EnrollmentDetailEntity> = {};

        if (number) {
            where.number = LessThan(number);
        }

        const response = await this.repository.findAndCount({
            relations: {subject: true},
            where,
        });

        return {
            data: response[0],
            pagination: {limit: 10, totalItems: response[1]},
        };
    }

    async findEnrollmentDetailsByEnrollment(enrollmentId: string): Promise<EnrollmentDetailEntity[]> {
        const response = await this.repository.find({
            relations: {
                parallel: true,
                enrollmentDetailStates: true,
                subject: true,
                type: true,
                workday: true,
            },
            where: {enrollmentId}
        });

        return response;
    }
}

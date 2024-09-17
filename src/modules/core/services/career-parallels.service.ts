import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {FindOptionsWhere, ILike, Repository} from 'typeorm';
import {CreateCareerDto, FilterCareerDto, PaginationDto, SeedCareerDto, UpdateCareerDto} from '@core/dto';
import {
    CareerAcademicPeriodsEntity,
    CareerEntity, CareerParallelEntity,
} from '@core/entities';
import {CoreRepositoryEnum, MessageEnum} from '@shared/enums';

@Injectable()
export class CareerParallelsService {
    constructor(
        @Inject(CoreRepositoryEnum.CAREER_PARALLEL_REPOSITORY)
        private repository: Repository<CareerParallelEntity>,
    ) {
    }

    async create(payload: CreateCareerDto | SeedCareerDto): Promise<any> {
        const newEntity = this.repository.create(payload);
        return await this.repository.save(newEntity);
    }


    async update(id: string, payload: UpdateCareerDto): Promise<any> {
        const entity = await this.repository.findOneBy({id});

        if (!entity) {
            throw new NotFoundException(MessageEnum.NOT_FOUND);
        }

        this.repository.merge(entity, payload);

        return await this.repository.save(entity);
    }

    async remove(id: string): Promise<any> {
        const entity = await this.repository.findOneBy({id});

        if (!entity) {
            throw new NotFoundException(`La carrera con id:  ${id} no se encontro`);
        }

        return await this.repository.softRemove(entity);
    }

    async findCapacityByCareer(careerId: string, parallelId: string, workdayId: string, academicPeriodId: string): Promise<number> {
        const response = await this.repository.findOne({
            where: {
                careerId,
                workdayId,
                parallelId,
                academicPeriodId
            }
        });

        if (!response) {
            return 0;
        }

        return response.capacity;
    }

    async findParallelsByCareer(careerId: string): Promise<CareerParallelEntity[]> {
        const response = await this.repository.find({
            relations: {
                parallel: true,
                workday: true,
            },
            where: {careerId}
        });

        return response;
    }
}

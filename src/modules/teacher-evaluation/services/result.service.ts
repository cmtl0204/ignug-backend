import { Injectable, NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ResultEntity } from '../entities/result.entity';
import { CreateResultDto } from '../dto/result/create-result.dto';
import { UpdateResultDto } from '../dto/result/update-result.dto';
import { FilterResultDto } from '../dto/result/filter-result.dto';
import { CoreRepositoryEnum } from '@shared/enums';

@Injectable()
export class ResultService {
  constructor(
    @Inject(CoreRepositoryEnum.RESULT_REPOSITORY)
    private readonly resultRepository: Repository<ResultEntity>,
  ) {}

  async create(createResultDto: CreateResultDto): Promise<ResultEntity> {
    const result = this.resultRepository.create(createResultDto);
    return await this.resultRepository.save(result);
  }

  async findAll(filter: FilterResultDto): Promise<{ data: ResultEntity[]; count: number }> {
    const [data, count] = await this.resultRepository.findAndCount({
      where: filter,
    });
    return { data, count };
  }

  async findOne(id: string): Promise<ResultEntity> {
    const result = await this.resultRepository.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException('Result not found');
    }
    return result;
  }

  async update(id: string, updateResultDto: UpdateResultDto): Promise<ResultEntity> {
    await this.resultRepository.update(id, updateResultDto);
    const updatedResult = await this.resultRepository.findOne({ where: { id } });
    if (!updatedResult) {
      throw new NotFoundException('Result not found');
    }
    return updatedResult;
  }

  async remove(id: string): Promise<void> {
    const result = await this.resultRepository.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException('Result not found');
    }
    await this.resultRepository.softRemove(result);
  }

  async removeAll(ids: string[]): Promise<void> {
    const results = await this.resultRepository.findByIds(ids);
    if (results.length === 0) {
      throw new NotFoundException('Results not found');
    }
    await this.resultRepository.softRemove(results);
  }
}

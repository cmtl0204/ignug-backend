import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { StudentResultEntity } from '../entities/student-result.entity';
import { CreateStudentResultDto } from '../dto/student-result/create-student-result.dto';
import { UpdateStudentResultDto } from '../dto/student-result/update-student-result.dto';
import { FilterStudentResultDto } from '../dto/student-result/filter-student-result.dto';
import { CoreRepositoryEnum } from '@shared/enums';

@Injectable()
export class StudentResultService {
  constructor(
    @Inject(CoreRepositoryEnum.STUDENT_RESULT_REPOSITORY)
    private readonly studentResultRepository: Repository<StudentResultEntity>,
  ) {}

  async create(createStudentResultDto: CreateStudentResultDto): Promise<StudentResultEntity> {
    const studentResult = this.studentResultRepository.create(createStudentResultDto);
    return await this.studentResultRepository.save(studentResult);
  }

  async findAll(filter: FilterStudentResultDto): Promise<{ data: StudentResultEntity[]; count: number }> {
    const [data, count] = await this.studentResultRepository.findAndCount({
      where: filter,
    });
    return { data, count };
  }

  async findOne(id: string): Promise<StudentResultEntity> {
    const studentResult = await this.studentResultRepository.findOne({ where: { id } });
    if (!studentResult) {
      throw new NotFoundException('StudentResult not found');
    }
    return studentResult;
  }

  async update(id: string, updateStudentResultDto: UpdateStudentResultDto): Promise<StudentResultEntity> {
    await this.studentResultRepository.update(id, updateStudentResultDto);
    const updatedStudentResult = await this.studentResultRepository.findOne({ where: { id } });
    if (!updatedStudentResult) {
      throw new NotFoundException('StudentResult not found');
    }
    return updatedStudentResult;
  }

  async remove(id: string): Promise<void> {
    const studentResult = await this.studentResultRepository.findOne({ where: { id } });
    if (!studentResult) {
      throw new NotFoundException('StudentResult not found');
    }
    await this.studentResultRepository.softRemove(studentResult);
  }

  async removeAll(ids: string[]): Promise<void> {
    const studentResults = await this.studentResultRepository.findByIds(ids);
    if (studentResults.length === 0) {
      throw new NotFoundException('StudentResults not found');
    }
    await this.studentResultRepository.softRemove(studentResults);
  }
}

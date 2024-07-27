import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { StudentEvaluationEntity } from '../entities/student-evaluation.entity';
import { CreateStudentResultDto } from '../dto/student-result/create-student-result.dto';
import { UpdateStudentResultDto } from '../dto/student-result/update-student-result.dto';
import { FilterStudentResultDto } from '../dto/student-result/filter-student-result.dto';
import { CoreRepositoryEnum, TeacherEvaluationRepositoryEnum } from '@shared/enums';

@Injectable()
export class StudentEvaluationService {
  constructor(
    @Inject(TeacherEvaluationRepositoryEnum.STUDENT_EVALUATION_REPOSITORY)
    private readonly studentEvaluationRepository: Repository<StudentEvaluationEntity>,
  ) {}

  async create(createStudentResultDto: CreateStudentResultDto): Promise<StudentEvaluationEntity> {
    const studentResult = this.studentEvaluationRepository.create(createStudentResultDto);
    return await this.studentEvaluationRepository.save(studentResult);
  }

  async findAll(filter: FilterStudentResultDto): Promise<{ data: StudentEvaluationEntity[]; count: number }> {
    const [data, count] = await this.studentEvaluationRepository.findAndCount({
      where: filter,
    });
    return { data, count };
  }

  async findOne(id: string): Promise<StudentEvaluationEntity> {
    const studentResult = await this.studentEvaluationRepository.findOne({ where: { id } });
    if (!studentResult) {
      throw new NotFoundException('StudentResult not found');
    }
    return studentResult;
  }

  async update(id: string, updateStudentResultDto: UpdateStudentResultDto): Promise<StudentEvaluationEntity> {
    await this.studentEvaluationRepository.update(id, updateStudentResultDto);
    const updatedStudentResult = await this.studentEvaluationRepository.findOne({ where: { id } });
    if (!updatedStudentResult) {
      throw new NotFoundException('StudentResult not found');
    }
    return updatedStudentResult;
  }

  async remove(id: string): Promise<void> {
    const studentResult = await this.studentEvaluationRepository.findOne({ where: { id } });
    if (!studentResult) {
      throw new NotFoundException('StudentResult not found');
    }
    await this.studentEvaluationRepository.softRemove(studentResult);
  }

  async removeAll(ids: string[]): Promise<void> {
    const studentResults = await this.studentEvaluationRepository.findByIds(ids);
    if (studentResults.length === 0) {
      throw new NotFoundException('StudentResults not found');
    }
    await this.studentEvaluationRepository.softRemove(studentResults);
  }
}

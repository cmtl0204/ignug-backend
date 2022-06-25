import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsString({ message: 'El campo debe ser de tipo string' })
  name: string;

  @IsNumber({}, { message: 'El campo userId debe ser un numero' })
  @IsPositive({ message: 'El campo userId debe ser un entero positivo' })
  userId: number;
}

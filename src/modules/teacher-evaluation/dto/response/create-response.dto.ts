import { IsUUID, IsString } from 'class-validator';

export class CreateResponseDto {
  @IsUUID()
  questionId: string;

  @IsString()
  code: string;

  @IsString()
  description: string;

  @IsString()
  name: string;

  @IsString()
  score: string;
}

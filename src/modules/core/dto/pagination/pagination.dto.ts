import { IsPositive, IsString } from 'class-validator';

export class PaginationDto {
  @IsPositive()
  limit: number;

  @IsPositive()
  page: number;

  @IsString()
  search: string;

  static getOffset(limit: number, page: number): number {
    return (page - 1) * limit;
  }
}

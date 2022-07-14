import { IsPositive, IsString, Min } from 'class-validator';

export class PaginationDto {
  @IsPositive()
  limit: number;

  @Min(0)
  page: number;

  @IsString()
  search: string;

  static getOffset(limit: number, page: number): number {
    return page * limit;
  }
}

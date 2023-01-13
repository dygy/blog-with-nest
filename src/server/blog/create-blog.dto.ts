import { IsString, IsDate } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  readonly name!: string;

  @IsDate()
  readonly date!: number;

  @IsString()
  readonly text!: string;
}

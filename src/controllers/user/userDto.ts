import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';

export class CreateDto {
  @ApiProperty({
    required: true,
  })
  readonly userName: string;

  @ApiProperty({
    required: true,
  })
  readonly email: string;

  @ApiProperty({
    required: true,
  })
  readonly password: string;

  @ApiProperty({
    required: false,
  })
  readonly name: string;

  @ApiProperty({
    required: false,
  })
  readonly lastName: string;
}
export class UpdateUserDto extends PartialType(CreateDto) {}

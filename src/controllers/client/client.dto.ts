import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';


export class ClientDto {
  @ApiProperty({
    required: true,
  })
  readonly name: string;

  @ApiProperty({
    required: true,
  })
  readonly lastName: string;

  @ApiProperty({
    required: true,
  })
  readonly email: string;

  @ApiProperty({
    required: false,
  })
  readonly address: string;

  @ApiProperty({
    required: false,
  })
  readonly phone: string;

  @ApiProperty({
    required: false,
  })
  readonly city: string;

  @ApiProperty({
    required: false,
  })
  readonly zipCode: string;
}

export class UpdateClientDto extends PartialType(ClientDto) {}
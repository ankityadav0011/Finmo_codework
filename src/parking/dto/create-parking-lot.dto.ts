import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateParkingLotDto {
  @IsNumber()
  @IsNotEmpty()
  no_of_slot: number;
}

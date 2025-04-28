import { IsNumber } from 'class-validator';

export class ExpandParkingLotDto {
  @IsNumber()
  increment_slot: number;
}

import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { CreateParkingLotDto } from './dto/create-parking-lot.dto';
import { ExpandParkingLotDto } from './dto/expand-parking-lot.dto';
import { ParkCarDto } from './dto/park-car.dto';
import { ClearSlotDto } from './dto/clear-slot.dto';

@Controller()
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Post('parking_lot')
  createParkingLot(@Body() createParkingLotDto: CreateParkingLotDto) {
    return this.parkingService.createParkingLot(createParkingLotDto.no_of_slot);
  }

  @Patch('parking_lot')
  expandParkingLot(@Body() expandParkingLotDto: ExpandParkingLotDto) {
    return this.parkingService.expandParkingLot(expandParkingLotDto.increment_slot);
  }

  @Post('park')
  parkCar(@Body() parkCarDto: ParkCarDto) {
    return this.parkingService.parkCar(parkCarDto);
  }

  @Get('registration_numbers/:color')
  getRegistrationNumbersByColor(@Param('color') color: string) {
    return this.parkingService.getRegistrationNumbersByColor(color);
  }

  @Get('slot_numbers/:color')
  getSlotNumbersByColor(@Param('color') color: string) {
    return this.parkingService.getSlotNumbersByColor(color);
  }

  @Get('slot_number/:car_registration_no')
  getSlotNumberByCarRegistrationNo(@Param('car_registration_no') carRegistrationNo: string) {
    return this.parkingService.getSlotNumberByRegistrationNumber(carRegistrationNo);
  }

  @Post('clear')
  clearSlot(@Body() clearSlotDto: ClearSlotDto) {
    return this.parkingService.clearSlot(clearSlotDto);
  }

  @Get('status')
  getStatus() {
    return this.parkingService.getStatus();
  }
}

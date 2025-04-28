import { Test, TestingModule } from '@nestjs/testing';
import { ParkingService } from '../parking.service';
import { ParkCarDto } from '../dto/park-car.dto';
import { ClearSlotDto } from "../dto/clear-slot.dto";

describe('ParkingService', () => {
  let service: ParkingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkingService],
    }).compile();

    service = module.get<ParkingService>(ParkingService);
  });

  it('should create a parking lot', () => {
    const result = service.createParkingLot(3);
    expect(result).toEqual({ total_slot: 3 });
    expect(service['slots'].length).toBe(3);
    expect(service['freeSlots'].size()).toBe(3);
  });

  it('should park a car', () => {
    service.createParkingLot(3);
    const parkCarDto: ParkCarDto = { car_reg_no: 'KA-01-HH-1234', car_color: 'White' };
    const result = service.parkCar(parkCarDto);
    expect(result).toEqual({ allocated_slot_number: 1 });
  });

  it('should throw an error when parking lot is full', () => {
    service.createParkingLot(1);
    service.parkCar({ car_reg_no: 'KA-01-HH-1234', car_color: 'White' });
    expect(() => {
      service.parkCar({ car_reg_no: 'KA-01-HH-5678', car_color: 'Black' });
    }).toThrowError('Parking lot is full');
  });

  it('should clear a slot', () => {
    service.createParkingLot(3);
    service.parkCar({ car_reg_no: 'KA-01-HH-1234', car_color: 'White' });
    const result = service.clearSlot({ slot_number: 1 });
    expect(result).toEqual({ freed_slot_number: 1 });
    expect(service['carMap'].has('KA-01-HH-1234')).toBe(false);
  });

  it('should get registration numbers by color', () => {
    service.createParkingLot(3);
    service.parkCar({ car_reg_no: 'KA-01-HH-1234', car_color: 'White' });
    const result = service.getRegistrationNumbersByColor('White');
    expect(result).toEqual(['KA-01-HH-1234']);
  });

  it('should get slot numbers by color', () => {
    service.createParkingLot(3);
    service.parkCar({ car_reg_no: 'KA-01-HH-1234', car_color: 'White' });
    const result = service.getSlotNumbersByColor('White');
    expect(result).toEqual([1]);
  });

  it('should get slot number by registration number', () => {
    service.createParkingLot(3);
    service.parkCar({ car_reg_no: 'KA-01-HH-1234', car_color: 'White' });
    const result = service.getSlotNumberByRegistrationNumber('KA-01-HH-1234');
    expect(result).toEqual(1);
  });

  it('should throw an error if registration number is not found', () => {
    service.createParkingLot(3);
    expect(() => {
      service.getSlotNumberByRegistrationNumber('KA-01-HH-9999');
    }).toThrowError('Car with registration number KA-01-HH-9999 not found');
  });

  it('should get parking lot status', () => {
    service.createParkingLot(3);
    service.parkCar({ car_reg_no: 'KA-01-HH-1234', car_color: 'White' });
    const result = service.getStatus();
    expect(result).toEqual([
      { slot_no: 1, registration_no: 'KA-01-HH-1234', color: 'White' },
    ]);
  });
});
import { Test, TestingModule } from '@nestjs/testing';
import { ParkingController } from '../parking.controller';
import { ParkingService } from '../parking.service';

describe('ParkingController', () => {
  let controller: ParkingController;
  let service: ParkingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingController],
      providers: [ParkingService],
    }).compile();

    controller = module.get<ParkingController>(ParkingController);
    service = module.get<ParkingService>(ParkingService);
  });

  it('should create a parking lot', () => {
    jest.spyOn(service, 'createParkingLot').mockImplementation(() => ({ total_slot: 3 }));
    const result = controller.createParkingLot({ no_of_slot: 3 });
    expect(result).toEqual({ total_slot: 3 });
  });

  it('should park a car', () => {
    jest.spyOn(service, 'parkCar').mockImplementation(() => ({ allocated_slot_number: 1 }));
    const result = controller.parkCar({ car_reg_no: 'KA-01-HH-1234', car_color: 'White' });
    expect(result).toEqual({ allocated_slot_number: 1 });
  });

  it('should clear a slot', () => {
    jest.spyOn(service, 'clearSlot').mockImplementation(() => ({ freed_slot_number: 1 }));
    const result = controller.clearSlot({ slot_number: 1 });
    expect(result).toEqual({ freed_slot_number: 1 });
  });

  it('should get registration numbers by color', () => {
    jest.spyOn(service, 'getRegistrationNumbersByColor').mockImplementation(() => ['KA-01-HH-1234']);
    const result = controller.getRegistrationNumbersByColor('White');
    expect(result).toEqual(['KA-01-HH-1234']);
  });

  it('should get slot numbers by color', () => {
    jest.spyOn(service, 'getSlotNumbersByColor').mockImplementation(() => [1]);
    const result = controller.getSlotNumbersByColor('White');
    expect(result).toEqual([1]);
  });

  it('should get parking lot status', () => {
    jest.spyOn(service, 'getStatus').mockImplementation(() => [
      { slot_no: 1, registration_no: 'KA-01-HH-1234', color: 'White' },
    ]);
    const result = controller.getStatus();
    expect(result).toEqual([
      { slot_no: 1, registration_no: 'KA-01-HH-1234', color: 'White' },
    ]);
  });
});
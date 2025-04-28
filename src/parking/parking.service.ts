import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ParkCarDto } from './dto/park-car.dto';
import { ClearSlotDto } from './dto/clear-slot.dto';
import { Car } from './entities/car.entity';
import { Slot } from './entities/slot.entity';
import  MinHeap  from 'heap-js';

@Injectable()
export class ParkingService {
  private slots: Slot[] = [];
  private slotMap: Map<number, Slot> = new Map(); // slotNumber -> Slot
  private carMap: Map<string, number> = new Map(); // registrationNumber -> slotNumber
  private colorMap: Map<string, Set<Slot>> = new Map(); // color -> Set of Slots
  private freeSlots = new MinHeap<Slot>((a, b) => a.slotNumber - b.slotNumber);

  createParkingLot(noOfSlots: number) {
    this.slots = [];
    this.slotMap.clear();
    this.carMap.clear();
    this.colorMap.clear();
    this.freeSlots.clear();

    for (let i = 1; i <= noOfSlots; i++) {
      const slot = new Slot(i);
      this.slots.push(slot);
      this.slotMap.set(i, slot);
      this.freeSlots.push(slot);
    }
    return { total_slot: this.slots.length };
  }

  expandParkingLot(incrementSlots: number) {
    const currentLength = this.slots.length;
    for (let i = 1; i <= incrementSlots; i++) {
      const slot = new Slot(currentLength + i);
      this.slots.push(slot);
      this.slotMap.set(slot.slotNumber, slot);
      this.freeSlots.push(slot);
    }
    return { total_slot: this.slots.length };
  }

  parkCar(parkCarDto: ParkCarDto) {
    if (this.freeSlots.size() === 0) {
      throw new BadRequestException('Parking lot is full');
    }

    const freeSlot = this.freeSlots.pop();
    if (!freeSlot) {
      throw new BadRequestException('No free slot found');
    }

    const car = new Car(parkCarDto.car_reg_no, parkCarDto.car_color);
    freeSlot.parkCar(car);
    this.carMap.set(car.registrationNumber, freeSlot.slotNumber);

    // Update colorMap
    const colorKey = car.color.toLowerCase();
    if (!this.colorMap.has(colorKey)) {
      this.colorMap.set(colorKey, new Set());
    }
    this.colorMap.get(colorKey)!.add(freeSlot);

    return { allocated_slot_number: freeSlot.slotNumber };
  }

  clearSlot(clearSlotDto: ClearSlotDto) {
    let slotToClear: Slot | undefined;

    if (clearSlotDto.slot_number !== undefined) {
      slotToClear = this.slotMap.get(clearSlotDto.slot_number);
    } else if (clearSlotDto.car_registration_no !== undefined) {
      const slotNumber = this.carMap.get(clearSlotDto.car_registration_no);
      if (slotNumber !== undefined) {
        slotToClear = this.slotMap.get(slotNumber);
      }
    }

    if (!slotToClear || slotToClear.isFree) {
      throw new NotFoundException('Slot is already free or car not found');
    }

    const carColor = slotToClear.car!.color.toLowerCase();
    this.carMap.delete(slotToClear.car!.registrationNumber);
    slotToClear.clearSlot();

    // Update colorMap
    const colorSlots = this.colorMap.get(carColor);
    if (colorSlots) {
      colorSlots.delete(slotToClear);
      if (colorSlots.size === 0) {
        this.colorMap.delete(carColor);
      }
    }

    this.freeSlots.push(slotToClear);
    return { freed_slot_number: slotToClear.slotNumber };
  }

  getRegistrationNumbersByColor(color: string) {
    const colorKey = color.toLowerCase();
    const result: string[] = [];
    const slots = this.colorMap.get(colorKey);

    if (slots) {
      for (const slot of slots) {
        result.push(slot.car!.registrationNumber);
      }
    }
    return result;
  }

  getSlotNumbersByColor(color: string) {
    const colorKey = color.toLowerCase();
    const result: number[] = [];
    const slots = this.colorMap.get(colorKey);

    if (slots) {
      for (const slot of slots) {
        result.push(slot.slotNumber);
      }
    }
    return result;
  }

  getSlotNumberByRegistrationNumber(registrationNumber: string): number {
    const slotNumber = this.carMap.get(registrationNumber);
    if (!slotNumber) {
      throw new NotFoundException(`Car with registration number ${registrationNumber} not found`);
    }
    return slotNumber;
  }

  getStatus() {
    const result: { slot_no: number; registration_no: string; color: string }[] = [];
    for (const slot of this.slotMap.values()) {
      if (!slot.isFree) {
        result.push({
          slot_no: slot.slotNumber,
          registration_no: slot.car!.registrationNumber,
          color: slot.car!.color,
        });
      }
    }
    return result;
  }
}

import { Car } from './car.entity';

export class Slot {
  public isFree: boolean;
  public car: Car | null;

  constructor(public slotNumber: number) {
    this.isFree = true;
    this.car = null;
  }
  
  parkCar(car: Car){
    this.car = car;
    this.isFree = false;
  }

  clearSlot(){
    this.car = null;
    this.isFree = true;
  }
}

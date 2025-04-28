```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


# Parking Lot Management System

This project is a parking lot management system built using **NestJS**. It allows you to create a parking lot, park cars, clear slots, and retrieve information about parked cars.

---

## **Features**
- Create a parking lot with a specified number of slots.
- Park a car in the nearest available slot.
- Clear a slot by slot number or car registration number.
- Retrieve registration numbers of cars by color.
- Retrieve slot numbers of cars by color.
- Retrieve the slot number of a car by its registration number.
- Get the current status of the parking lot.

## API Endpoints

Here are the available API endpoints for the Parking Lot system:

1. **Create Parking Lot**
   - **Method**: `POST`
   - **URL**: `/parking_lot`
   - **Body** (JSON):
     ```json
     {
       "no_of_slot": 5
     }
     ```
   - **Description**: Initializes the parking lot with the specified number of slots.

2. **Expand Parking Lot**
   - **Method**: `PATCH`
   - **URL**: `/parking_lot`
   - **Body** (JSON):
     ```json
     {
       "increment_slot": 3
     }
     ```
   - **Description**: Adds more slots to the existing parking lot.

3. **Park a Car**
   - **Method**: `POST`
   - **URL**: `/park`
   - **Body** (JSON):
     ```json
     {
       "car_reg_no": "KA-01-HH-1234",
       "car_color": "White"
     }
     ```
   - **Description**: Parks a car in the first available slot.

4. **Clear a Slot**
   - **Method**: `POST`
   - **URL**: `/clear`
   - **Body** (JSON):
     ```json
     {
       "slot_number": 1
     }
     ```
     **OR**
     ```json
     {
       "car_registration_no": "KA-01-HH-1234"
     }
     ```
   - **Description**: Frees up a slot by slot number or car registration number.

5. **Get Registration Numbers by Color**
   - **Method**: `GET`
   - **URL**: `/registration_numbers/:color`
   - **Example**: `/registration_numbers/White`
   - **Description**: Retrieves all car registration numbers for cars of a specific color.

6. **Get Slot Numbers by Color**
   - **Method**: `GET`
   - **URL**: `/slot_numbers/:color`
   - **Example**: `/slot_numbers/White`
   - **Description**: Retrieves all slot numbers for cars of a specific color.

7. **Get Parking Lot Status**
   - **Method**: `GET`
   - **URL**: `/status`
   - **Description**: Retrieves the current status of the parking lot, including occupied slots and car details.

7. **Get Parking Lot By Car Registration Number**
   - **Method**: `GET`
   - **URL**: `/slot_number/:registrationNumber`
   - **Description**: Retrieves the slot number by car registration number 




# How to Run the Project

A. **Run Locally**

  1. **Clone the repository:**
   git clone <repository-url>
   cd project1

  2. **Install dependencies:**
   npm install

  3. **Start the application:**
   npm run start

B. **Run with Docker**
  1. **docker build -t parking-service .**
     docker build -t parking-service .
  2. **Run the Docker container:**
     docker run -p 3000:3000 parking-service
  3.  **Access the application at**
      http://localhost:3000.

 




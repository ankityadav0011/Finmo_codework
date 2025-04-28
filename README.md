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



## **Data Structures Used and Their Complexities**

### **1. MinHeap (for Free Slots)**
- **Purpose**: To efficiently manage free slots and always retrieve the smallest available slot.
- **Operations**:
  - **Insert (`push`)**: **O(log n)**
  - **Remove Min (`pop`)**: **O(log n)**
  - **Peek Min (`top`)**: **O(1)**
- **Space Complexity**: **O(f)**, where `f` is the number of free slots (at most `n`).

### **2. Map (for Slot Management)**
- **Purpose**: To map slot numbers to `Slot` objects for efficient lookup.
- **Operations**:
  - **Insert (`set`)**: **O(1)**
  - **Search (`get`)**: **O(1)**
  - **Delete (`delete`)**: **O(1)**
- **Space Complexity**: **O(n)**, where `n` is the total number of slots.

### **3. Map (for Car Management)**
- **Purpose**: To map car registration numbers to slot numbers for efficient lookup.
- **Operations**:
  - **Insert (`set`)**: **O(1)**
  - **Search (`get`)**: **O(1)**
  - **Delete (`delete`)**: **O(1)**
- **Space Complexity**: **O(k)**, where `k` is the number of parked cars (at most `n`).

### **4. Map (for Color-Based Queries)**
- **Purpose**: To map car colors to sets of slots for efficient color-based queries.
- **Operations**:
  - **Insert (`set`)**: **O(1)**
  - **Search (`get`)**: **O(1)**
  - **Delete (`delete`)**: **O(1)**
  - **Iteration Over Slots**: **O(k)**, where `k` is the number of cars of the specified color.
- **Space Complexity**: **O(c)**, where `c` is the number of unique car colors.

### **5. Slot Array**
- **Purpose**: To store all slots in the parking lot.
- **Operations**:
  - **Access by Index**: **O(1)**
  - **Iteration**: **O(n)**
- **Space Complexity**: **O(n)**, where `n` is the total number of slots.

---

## **Overall Time Complexity of Operations**

| **Operation**                     | **Time Complexity** | **Explanation**                                                                 |
|------------------------------------|---------------------|---------------------------------------------------------------------------------|
| **Create Parking Lot**             | **O(n)**            | Initializes `slotMap`, `freeSlots`, and `slots` for `n` slots.                 |
| **Expand Parking Lot**             | **O(m)**            | Adds `m` new slots to `slotMap` and `freeSlots`.                               |
| **Park a Car**                     | **O(log f)**        | Retrieves the smallest free slot from `freeSlots` (min-heap).                  |
| **Clear a Slot**                   | **O(log f)**        | Adds the cleared slot back to `freeSlots` (min-heap).                          |
| **Get Registration Numbers by Color** | **O(k)**            | Retrieves cars of a specific color from `colorMap`.                            |
| **Get Slot Numbers by Color**      | **O(k)**            | Retrieves slots of a specific color from `colorMap`.                           |
| **Get Slot Number by Registration**| **O(1)**            | Retrieves the slot number from `carMap`.                                       |
| **Get Status**                     | **O(n)**            | Iterates through all slots in `slotMap` to generate the status.                |

---

## **Space Complexity**
The overall space complexity of the project is **O(n)**, where `n` is the total number of slots in the parking lot. This includes:
- **`slotMap`**: Stores all `Slot` objects.
- **`carMap`**: Stores mappings for parked cars (at most `n` entries).
- **`colorMap`**: Stores mappings for car colors (at most `n` entries in the worst case).
- **`freeSlots`**: Stores references to free slots (at most `n` entries).

---




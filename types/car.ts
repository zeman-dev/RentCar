  export interface Car {
      "id": string,
      "year": number,
      "brand": string,
      "model": string,
      "type": string,
      "img": string,
      "description": string,
      "fuelConsumption": string,
      "engine": string,
      "features": [string],
      "rentalPrice": string,
      "rentalCompany": string,
      "location": {
        "country": string,
        "city": string,
        "address": string
      },
      "rentalConditions": [ string ],
      "mileage": number
    }

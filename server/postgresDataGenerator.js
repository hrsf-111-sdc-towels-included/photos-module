const fs = require('fs');
const faker = require('faker');
const Stream = require('stream');
const ws = fs.createWriteStream('./postgres.csv');

// outer loop numberOfBatches
  // inner loop batchSize
    // create data with faker
    // write data to file, wait for it to finish
    // clear data
  //
//

class GenerateData extends Stream.Readable {
  constructor(opt) {
    super(opt);
    
    this.houses = 10000000;
    this.completedHouses = 0; 
    this.count = 1;
    this.buffer = '';
  }

  generateData(houseId) {
    // let randomPhotos = Math.floor(Math.random() * 6) + 5;
    for (let i = 0; i < 10; i++) {
      this.buffer += `${houseId},${faker.image.imageUrl()},${faker.commerce.productAdjective()}\n`

    }
  }

  _read() {
    const interval = this.completedHouses + 100;
    if (this.completedHouses === this.houses) {
      this.push(null);
    } else {
      for (let j = this.completedHouses; j < interval; j++) {
        this.generateData(this.completedHouses);
        this.completedHouses++;
      } 
      this.push(this.buffer);
      this.buffer= '';
    }
  }
}


const rs = new GenerateData();
rs.pipe(ws);
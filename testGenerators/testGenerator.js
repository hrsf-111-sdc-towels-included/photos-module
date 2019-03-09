const fs = require('fs');
const faker = require('faker');
const Stream = require('stream');
const ws = fs.createWriteStream('./testData.csv');

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
    
    this.houses = 10;
    this.completedHouses = 0; 
    this.count = 1;
    this.buffer = '';
    this.id = 1;
  }

  generateData(houseId) {
    // let randomPhotos = Math.floor(Math.random() * 6) + 5;
    for (let i = 0; i < 10; i++) {
      this.buffer += `${this.id},${houseId},${faker.image.imageUrl()},${faker.commerce.productAdjective()}\n`
      this.id++;

    }
  }

  _read() {
    const interval = this.completedHouses + 100;
    if (this.completedHouses === this.houses) {
      this.push(null);
    } else {
      for (let j = 0; j < 10; j++) {
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
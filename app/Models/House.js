export class House {
  constructor(data) {
    this.bathrooms = data.bathrooms || 0
    this.bedrooms = data.bedrooms || 0
    this.createdAt = new Date(data.createdAt)
    this.description = data.description || ''
    this.id = data.id
    this.imgUrl = data.imgUrl || ''
    this.levels = data.levels || 0
    this.price = data.price || 0
    this.year = data.year || 0

  }

  get HouseTemplate() {
    return `
        <div class="card col-3 m-2">
          <img src="${this.imgUrl}" class="card-img-top img-fluid" alt="home">
          <div class="card-body">
            <h5 class="card-title d-flex justify-content-between mb-2">
              <span>Levels: ${this.levels}</span>
              <span>$${this.price}</span>
            </h5>
            <p>Bathrooms: ${this.bathrooms} Bedrooms: ${this.bedrooms}</p>
            <div class="d-flex justify-content-between">
              <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="app.housesController.setActiveHouse('${this.id}')">
                Edit
              </button>
              <button onclick="app.housesController.removeHouse('${this.id}')" title="Delete home!" class="btn btn-danger">
                <i class="mdi mdi-delete"></i>
              </button>
            </div>
          </div>
        </div>`
  }

  static GetHouseFormTemplate(house) {
    if (!house) {
      house = new House({})
    }
    return `
        <form onsubmit="app.housesController.${house.id ? `editHouse('${house.id}')` : 'createHouse()'}">
          <div class="form-floating mb-3">
            <input type="number" class="form-control" id="levels" name="levels" placeholder="Home levels" value='${house.levels}' required>
            <label for="levels">Home Levels</label>
          </div>
          <div class="form-floating mb-3">
            <input type="number" class="form-control" id="bathrooms" name="bathrooms" placeholder="bathrooms" value='${house.bathrooms}' required>
            <label for="bathrooms">bathrooms</label>
          </div>
          <div class="form-floating mb-3">
            <input type="number" class="form-control" id="home-price" name="price" placeholder="Home Price" value='${house.price}' required>
            <label for="home-price">Price</label>
          </div>
          <div class="form-floating mb-3">
            <input type="number" class="form-control" id="bedrooms" name="bedrooms" placeholder="Bedrooms" value='${house.bedrooms}' required>
            <label for="bedrooms">Bedrooms</label>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="home-img" name="imgUrl" placeholder="Image" value='${house.imgUrl}'>
            <label for="home-img">Image</label>
          </div>
          <div class="form-floating mb-3">
            <input type="number" class="form-control" id="year" name="year" placeholder="Year" value='${house.year}' required>
            <label for="year">Year</label>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="description" name="description" placeholder="Description" value='${house.description}' required>
            <label for="description">Description</label>
          </div>
          <button type="submit" class="btn btn-success my-3">Submit</button>
          <button type="reset" class="btn btn-outline-danger my-3">Reset</button>
        </form>`
  }
}
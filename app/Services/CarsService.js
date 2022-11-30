import { appState } from "../AppState.js"
import { Car } from "../Models/Car.js"
import { Pop } from "../Utils/Pop.js"


class CarsService {
  async editCar(carData, id) {
    const res = await axios.put('http://localhost:3000/api/cars/' + id, carData)
    console.log('[EDIT CAR]', res.data);
    // find the one we edited in the appstate
    let index = appState.cars.findIndex(c => c.id == id)
    // splice out old and replace with new
    appState.cars.splice(index, 1, new Car(res.data))
    // trigger listener to draw
    appState.emit('cars')
  }
  setActive(id) {
    let car = appState.cars.find(c => c.id == id)
    appState.activeCar = car
    console.log(appState.activeCar);
  }

  async getCars() {
    const res = await axios.get('http://localhost:3000/api/cars')
    // console.log('[GOT CARS]', res.data) //NOTE - REALLY import to check got data.
    appState.cars = res.data.map(c => new Car(c))
  }
  async createCar(carData) {
    const res = await axios.post('http://localhost:3000/api/cars', carData)
    console.log('[POST CAR]', res.data);
    appState.cars = [...appState.cars, new Car(res.data)]

  }
  async removeCar(id) {
    const res = await axios.delete('http://localhost:3000/api/cars/' + id)
    console.log('[DELETE CAR]', res.data);
    Pop.toast(res.data, 'success')
    appState.cars = appState.cars.filter(c => c.id != id)
  }

}

export const carsService = new CarsService()
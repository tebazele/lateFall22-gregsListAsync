import { appState } from "../AppState.js"
import { House } from "../Models/House.js"
import { Pop } from "../Utils/Pop.js";

class HousesService {
    async editHouse(houseData, id) {
        // @ts-ignore
        const response = await axios.put('http://localhost:3000/api/houses/' + id, houseData)
        console.log('edit house', response.data);
        let editedHouse = response.data
        // edit house in my houses array
        let index = appState.houses.findIndex(h => h.id == id)
        appState.houses.splice(index, 1, new House(editedHouse))

        appState.emit('houses')
    }
    setActiveHouse(id) {
        let currHouse = appState.houses.find(h => h.id == id)
        appState.activeHouse = currHouse
        console.log(currHouse);
    }
    async removeHouse(id) {
        // console.log('removing house', id)
        // @ts-ignore
        const response = await axios.delete('http://localhost:3000/api/houses/' + id)
        console.log('DELETE HOUSE ', response.data);
        Pop.toast('car deleted', 'success')
        appState.houses = appState.houses.filter(h => h.id != id)
    }
    async createHouse(houseData) {
        console.log('creating house')
        // @ts-ignore
        const response = await axios.post('http://localhost:3000/api/houses', houseData)
        console.log('POST HOUSE', response.data)
        let newestHouse = new House(response.data)
        appState.houses.push(newestHouse)
        appState.houses = appState.houses
    }
    async getHouses() {
        // @ts-ignore
        const response = await axios.get('http://localhost:3000/api/houses')
        // console.log('got houses', response.data)
        appState.houses = response.data.map(house => new House(house))
    }

}

export const housesServices = new HousesService()
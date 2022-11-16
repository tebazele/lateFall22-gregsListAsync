import { appState } from "../AppState.js";
import { House } from "../Models/House.js";
import { housesServices } from "../Services/HousesService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";

function _drawHouses() {
    let template = ''
    appState.houses.forEach(h => template += h.HouseTemplate)
    setHTML('listings', template)
}

function _drawHouseForm() {
    let house = appState.activeHouse
    setHTML('listing-form', House.GetHouseFormTemplate(house))
}


export class HousesController {
    constructor() {
        // console.log('controller linked up')
        appState.on('houses', _drawHouses)
        appState.on('activeHouse', _drawHouseForm)

    }

    async getHouses() {
        try {
            await housesServices.getHouses()
        } catch (error) {
            console.log(error);
        }
    }

    async showHouses() {
        try {
            await this.getHouses()
            _drawHouses()
            _drawHouseForm()
        } catch (error) {
            console.log(error);
        }


    }

    async createHouse() {
        try {
            // @ts-ignore
            window.event.preventDefault()
            // @ts-ignore
            let form = window.event.target
            let houseData = getFormData(form)
            Pop.toast('House created!', 'success')
            // console.log(houseData)
            await housesServices.createHouse(houseData)
            // @ts-ignore
            form.reset()
        } catch (error) {
            console.log(error);
        }



    }

    async editHouse(id) {
        try {
            // @ts-ignore
            window.event.preventDefault()
            // @ts-ignore

            const form = window.event.target
            const houseData = getFormData(form)
            await housesServices.editHouse(houseData, id)
            // @ts-ignore
            form.reset()

        } catch (error) {
            console.log(error);
        }
    }
    async removeHouse(id) {
        try {
            if (await Pop.confirm('Are you sure?')) {
                await housesServices.removeHouse(id)

            }

        } catch (error) {
            console.log(error)
        }

    }

    setActiveHouse(id) {
        housesServices.setActiveHouse(id)
    }
}
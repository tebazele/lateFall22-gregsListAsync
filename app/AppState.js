import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"
import { loadState } from "./Utils/Store.js"

class AppState extends EventEmitter {

  /** @type {import('./Models/Car').Car[]} */
  cars = []

  /** @type {import('./Models/Car').Car|null} */
  activeCar = null

  /** @type {import('./Models/House').House[]} */
  houses = []

  /** @type {import('./Models/House').House | null | undefined} */
  activeHouse = null

  /** @type {import('./Models/Job').Job[]} */
  jobs = []

  /** @type {import('./Models/Job').Job | null | undefined} */
  activeJob = null

}

export const appState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})

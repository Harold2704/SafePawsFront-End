import { pets } from "./pets"
import { vaccines } from "./vaccines"

export class vaccinepets {
    idVaccinePet: number = 0
    dateApplication: Date = new Date()
    vaccine: vaccines = new vaccines()
    nameVaccine: string = ""
    pet: pets = new pets()
    namePet: string = ""
} 
import { pets } from "./pets"
import { vaccines } from "./vaccines"

export class vaccinepets {
    idVaccinePet: number = 0
    dateApplication: Date = new Date()
    idVaccine: vaccines = new vaccines()
    nameVaccine: string = ""
    idPet: pets = new pets()
    namePet: string = ""
}
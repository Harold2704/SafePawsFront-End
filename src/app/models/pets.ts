import { races } from "./races"
import { shelters } from "./shelters"

export class pets {
    idPet: number = 0
    name: string = ""
    sex: string = ""
    birthdate: Date = new Date()
    weight: number = 0
    description: string = ""
    status: boolean = false
    shelter: shelters = new shelters()
    nameShelter: string = ""
    race: races = new races()
    nameRace: string = ""
}
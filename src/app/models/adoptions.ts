import { clients } from "./clients"
import { pets } from "./pets"

export class adoptions {
    idAdoption: number = 0
    observation: string = ""
    dateAdoption: Date = new Date()
    status: boolean = false
    idClient: clients = new clients()
    nameClient: string = ""
    idPet: pets = new pets()
    namePet: string = ""
} 
import { clients } from "./clients"
import { pets } from "./pets"

export class adoptions {
    idAdoption: number = 0
    observation: string = ""
    dateAdoption: Date = new Date()
    status: boolean = false
    client: clients = new clients()
    nameClient: string = ""
    pet: pets = new pets()
    namePet: string = ""
}
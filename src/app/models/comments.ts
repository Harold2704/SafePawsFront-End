import { clients } from "./clients"
import { shelters } from "./shelters"

export class comments {
    idComment: number = 0
    description: string = ""
    qualification: number = 0
    publicationDate: Date = new Date()
    idShelter: shelters = new shelters()
    nameShelter: string = ""
    idClient: clients = new clients()
    nameClient: string = ""
}

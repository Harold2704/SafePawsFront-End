import { clients } from "./clients"
import { shelters } from "./shelters"

export class comments {
    idComment: number = 0
    description: string = ""
    qualification: number = 0
    publicationDate: Date = new Date()
    shelter: shelters = new shelters()
    nameShelter: string = ""
    client: clients = new clients()
    nameClient: string = ""
}
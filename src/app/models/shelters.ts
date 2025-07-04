import { users } from "./users"

export class shelters {
    idShelter: number = 0
    name: string = ""
    number: string = ""
    email: string = ""
    adress: string = ""
    openingDate: Date = new Date()
    ability: number = 0
    idUser: users = new users()
}
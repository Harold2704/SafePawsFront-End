import { pets } from "./pets"

export class medicalhistories {
    idMedicalHistory: number = 0
    dateMedicalHistory: Date = new Date()
    diagnostic: string = ""
    veterinarian: string = ""
    idPet: pets = new pets()
    namePet: string = ""
} 
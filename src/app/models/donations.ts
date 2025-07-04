import { clients } from "./clients"
import { shelters } from "./shelters"
import { vouchers } from "./vouchers"

export class donations {
    idDonation: number = 0
    donationDate: Date = new Date()
    type: string = ""
    amount: number = 0
    detail: string = ""
    idClient: clients = new clients()
    nameClient: string = ""
    idShelter: shelters = new shelters()
    nameShelter: string = ""
    idVoucher: vouchers = new vouchers()
    codeVoucher: string = ""
}
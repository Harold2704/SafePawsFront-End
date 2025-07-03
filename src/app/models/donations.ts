import { clients } from "./clients"
import { shelters } from "./shelters"
import { vouchers } from "./vouchers"

export class donations {
    idDonation: number = 0
    donationDate: Date = new Date()
    type: string = ""
    amount: number = 0
    detail: string = ""
    client: clients = new clients()
    nameClient: string = ""
    shelter: shelters = new shelters()
    nameShelter: string = ""
    voucher: vouchers = new vouchers()
    codeVoucher: string = ""
}
import Car from './Car'
import {DealershipInterface} from './DealershipInterface' 

export default class Dealership implements DealershipInterface {
    private address: string
    private carList: Array<Car>

    constructor(address: string, carList: Array<Car>){
        this.address = address
        this.carList = carList
    }

    public giveAddress() : string {
        return this.address
    }
    public showCarList() : any {
        return this.carList
    }

    public giveWorkingHour() : string {
        return 'From Monday to Friday, from 8:00 to 18:00 and Saturdays, from 08:00 to 12:00'
    }

}


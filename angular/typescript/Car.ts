import Vehicle from './Vehicle'

export default class Car extends Vehicle {
    private doorNumber: number

    constructor(model: string, doorNumber: number) {
        super()
        this.model = model
        this.doorNumber = doorNumber
    }
}
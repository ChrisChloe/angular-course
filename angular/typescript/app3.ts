class Car {
    private model: string
    private doorNumber: number
    private speed: number = 0

    constructor(model: string, doorNumber: number) {
        this.model = model
        this.doorNumber = doorNumber
    }

    public speeUp() :void {
        this.speed = this.speed + 10
    }
    
    public stop() :void {
        this.speed = 0
    }
    
    public currentSpeed() :number {
        return this.speed
    }
}

class Dealership {
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

}

class Person {
    private name: string
    private favouriteCar: string
    private car : Car

    constructor(name: string, favouriteCar: string){
        this.name =  name
        this.favouriteCar = favouriteCar
    }

    public sayName(): string {
        return this.name
    }

    public sayFavouriteCar(): string {
        return this.favouriteCar
    }

    public buyCar(car : Car): void {
        this.car = car
    }

    public sayOwnedCar(): Car {
        return this.car
    }


}

let person = new Person('Bob','Honda');
console.log(person.sayFavouriteCar())

/*-- create cars --*/

let carA = new Car('Dodge',2)
let carB = new Car('Veloster',4)
let carC = new Car('Chevette',3)

/* -- assemble list of cars from dealership */
let carList : Array<Car> = [carA, carB, carC]

let dealership = new Dealership('Center of Town',carList)

/*-- show list of cars  --*/
/*-- buy car --*/
let client = new Person('Bob','Dodge')

dealership.showCarList().map((car: Car) => {
    if(car['model'] == client.sayFavouriteCar()) {
        //buys car
        client.buyCar(car)

    }
})

console.log(client.sayOwnedCar())
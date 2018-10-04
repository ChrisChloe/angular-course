import Car from './Car'

export default class Person {
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
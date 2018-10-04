import { DaoInterface } from './DaoInterface';
import Car from "./Car";

export class CarDao implements DaoInterface {

    nameTable : string = 'tb_car'

    insert(object : any): boolean {
        console.log('insert logic')
        return true
    }
    
    update(object : any): boolean {
        console.log('update logic')
        return true
    }
    
    remove(id: number): Car {
        console.log('remove logic')
        return new Car('',4)
    }

    select(id: number): Car {
        console.log('select logic')
        return new Car('',4)
    }
    selectAll() : any {
        console.log('getAll logic')
        return [new Array]
    }
}
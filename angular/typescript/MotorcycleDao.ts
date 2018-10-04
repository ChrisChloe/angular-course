import { DaoInterface } from './DaoInterface';
import Motorcycle from "./Motorcycle";

export class MotorcycleDao implements DaoInterface {

    nameTable : string = 'tb_motorcycle'

    insert(object : any): boolean {
        console.log('insert logic')
        return true
    }
    
    update(object : any): boolean {
        console.log('update logic')
        return true
    }
    
    remove(id: number): Motorcycle {
        console.log('remove logic')
        return new Motorcycle()
    }

    select(id: number): Motorcycle {
        console.log('select logic')
        return new Motorcycle()
    }
    selectAll() : any {
        console.log('getAll logic')
        return [new Array]
    }
}
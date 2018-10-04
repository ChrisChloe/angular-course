import { DaoInterface } from './DaoInterface';
import Dealership from "./Dealership";

export class DealershipDao implements DaoInterface {

    nameTable : string = 'tb_dealership'

    insert(object : any): boolean {
        console.log('insert logic')
        return true
    }
    
    update(object : any): boolean {
        console.log('update logic')
        return true
    }
    
    remove(id: number): Dealership {
        console.log('remove logic')
        return new Dealership('',[])
    }

    select(id: number): Dealership {
        console.log('select logic')
        return new Dealership('',[])
    }
    selectAll() : any {
        console.log('getAll logic')
        return [new Array]
    }
}
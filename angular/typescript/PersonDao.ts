import { DaoInterface } from './DaoInterface';
import Person from "./Person";

export class PersonDao implements DaoInterface {

    nameTable : string = 'tb_person'

    insert(object : any): boolean {
        console.log('insert logic')
        return true
    }
    
    update(object : any): boolean {
        console.log('update logic')
        return true
    }
    
    remove(id: number): Person {
        console.log('remove logic')
        return new Person('','')
    }

    select(id: number): Person {
        console.log('select logic')
        return new Person('','')
    }
    selectAll() : any {
        console.log('getAll logic')
        return [new Array]
    }
}
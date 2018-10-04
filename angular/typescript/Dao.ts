import { DaoInterface } from './DaoInterface';

export class Dao<T> implements DaoInterface<T> {
    nameTable : string = ''

    insert(object : T): boolean {
        console.log('insert logic')
        return true
    }
    
    update(object : T): boolean {
        console.log('update logic')
        return true
    }
    
    remove(id: number): T {
        console.log('remove logic')
        return Object()
    }

    select(id: number): T {
        console.log('select logic')
        return Object()
    }
    selectAll() : [T] {
        console.log('getAll logic')
        return [Object()]
    }
}
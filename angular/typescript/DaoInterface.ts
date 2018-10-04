export interface DaoInterface<T> {
    nameTable : string

    insert(object : T): boolean
    update(object : T): boolean
    remove(id: number): T
    select(id: number): T
    selectAll() : [T]

}
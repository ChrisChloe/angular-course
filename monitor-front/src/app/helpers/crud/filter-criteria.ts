export class FilterCriteria {
    private _params: Object = {} as Object;

    /**
     * @param paramName
     * @param value
     */
    public addParam(paramName: string, value: any): void{
        this._params[paramName] = value;
    }

    public addListParams(limit = 15, page = 1, sortedBy = 'asc', orderBy = 'id'): void {
        this.addParam('limit', limit);
        this.addParam('page', page);
        this.addParam('sortedBy', sortedBy);
        this.addParam('orderBy', orderBy);
    
    }

    get params (){ 
        return this._params;
    }


    
}
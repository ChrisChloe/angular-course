import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ObserveOnOperator } from 'rxjs/internal/operators/observeOn';

export abstract class CrudServices {
    protected http: HttpClient;
    protected entity: string;

    public constructor() { }


    // protected createOptionsUrl(options: any) {
    //     let url = '?';

    //     _.forEach(options, (value, key) => {
    //         url += `${key === 'pageSize' ? 'limit' : key}=${value}&`;
    //     });

    //     return url;
    // }


    /**
     *
     * @param data (any)
     */
    public post(data): Observable<any> {

        return new Observable((observer) => {

            this.http.post(`${environment.API_URL}/api/${this.entity}`, data)
                .subscribe(
                    (res) => {
                        observer.next(res);
                    },
                    () => {
                        observer.error();
                    }

            );

        });

    }




    /**
     *
     * @param id (number)
     */
    public get(id: any = false): Observable<any> {
        return this.http.get(`${environment.API_URL}/${this.entity}${id ? `/${id}` : ''}`)
    }

    /**
 *
 * @param id (number)
 */
    public query(params: any): Observable<any> {

        return new Observable((observer) => {

            this.http.get(`${environment.API_URL}/${this.entity}`, { params: params })
                .subscribe(
                    (res) => {
                        observer.next(res);
                    },
                    () => {
                        observer.error();
                    }

            );

        });

    }


    /**
     *
     * @param id (number)
     * @param status (number)
     */
    public delete(id: number): Observable<any> {
        return this.http.delete(`${environment.API_URL}/api/${this.entity}/${id}`)
    }


    /**
     *
     * @param options (any)
     */
    // public getData(options: any): Observable<any> {
    //     const optionsUrl = this.createOptionsUrl(options);
    //     return this.http.get(`${environment.API_URL}/api/${this.entity}${optionsUrl}`);
    // }


    /**
     *
     * @param _data
     * @returns {Observable<any>}
     */
    public update(_data): Observable<any> {
        return this.http.put(`${environment.API_URL}/api/${this.entity}/${_data.id}`, _data);
    }

}
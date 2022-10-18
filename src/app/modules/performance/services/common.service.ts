import { City } from './../model/city.model';
import { State } from './../model/state.model';
import { Country } from './../model/country.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable()
export class CommonService {

    constructor(private httpCilent: HttpClient){}

    country():Observable<{ results: Array<Country>, count: number }>{
        return this.httpCilent.get<{ results: Array<Country>, count: number }>(`${environment.performance}core/country/`)
    }

    state():Observable<{ results: Array<State>, count: number }>{
        return this.httpCilent.get<{ results: Array<State>, count: number }>(`${environment.performance}core/state/`)
    }

    city():Observable<{ results: Array<City>, count: number }>{
        return this.httpCilent.get<{ results: Array<City>, count: number }>(`${environment.performance}core/city/`)
    }

    stateList(value:string):Observable<{ results: Array<State>, count: number }>{
        return this.httpCilent.get<{ results: Array<State>, count: number }>(`${environment.performance}core/state-list/?country_code=${value}`)
    }

    cityList(value:string):Observable<{ results: Array<City>, count: number }>{
        return this.httpCilent.get<{ results: Array<City>, count: number }>(`${environment.performance}core/city-list/?state_code=${value}`)
    }

}
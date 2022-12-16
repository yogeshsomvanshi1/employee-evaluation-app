import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class SharedService {

  constructor(private http:HttpClient) { }

    public isStringUrl = new BehaviorSubject<any | undefined>("");
  emit(value: any) {
    this.isStringUrl.next(value);
  }
  on(): Observable<String | undefined> {
    return this.isStringUrl.asObservable();
  }

  // gettabEditData(templateId, tabId, version) {
  //   return this.http.get(environment.baseUrl + "/patchTemplateData?" + "templateId=" + templateId + "&tabId=" + tabId + "&version=" + version);
  // }

  // postDynamicData(data) {
  //   return this.http.post(environment.baseUrl + "/createTemplateData", data);
  // }

  removingSpace(value){
    for (var key in value) {
      console.log(typeof value[key]);
        if(value[key] != null ) {
            if( typeof value[key]=="object"){
                value[key] = value[key];
            } else {
                value[key] = value[key].toString().trim();
            }    
        } else {
             value[key] = "";
        } 
    }
    return value;
  }
}

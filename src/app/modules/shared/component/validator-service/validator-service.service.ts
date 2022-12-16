import { Injectable } from '@angular/core';

// FIXME: This is kind of utility and this is not the right way. Either we can create a validator instead. Also the name ValidatorServiceService is not correct.
@Injectable({
  providedIn: 'root'
})
export class ValidatorServiceService {

  constructor() { }

 private descriptionPattern:string ="^[A-Za-z0-9  \\- @ ! & % _ ? \n / . , : ; ' \"  ]+$";
 private nameAndDescription:string = '^[A-Za-z0-9-@,.!?%&@ ]+$';

  descriptionValidation(){
    return this.descriptionPattern;
  }

  nameAndDescriptions(){
    return this.nameAndDescription;
  }

}





import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

 export function zipCode(control: AbstractControl){
    if(control.value !== null ){
        const regex = new RegExp('^[0-9]{6}$');
        if(!regex.test(control.value)){
            return {
                isError: true
            }
        }

        // return { 
        //     'isError': true
        // }
    }
    return null;
 }

//  Number Validation
 export function onlyNumber(control: AbstractControl){
     if(control.value !== null){
        const digitCode = new RegExp('^[0-9]*$');
        if(!digitCode.test(control.value)){
            return{
                isDigit: true
            }
        }
     }
     return null;
 }

 export function onlyNumDot(control: AbstractControl){
    if(control.value !== null){
       const digitCode = new RegExp('^[0-9]{4}$');
       if(!digitCode.test(control.value)){
           return{
               isDigit: true
           }
       }
    }
    return null;
}


//  Character Validation
export function onlyChar(control: AbstractControl){
    if(control.value !== null){
       const charCode = new RegExp('^[a-zA-Z ]*$');
       if(!charCode.test(control.value)){
           return{
               isChar: true
           }
       }
    }
    return null;
}

// Alpa Numeric

export function alphaNumeric(control: AbstractControl){
    if(control.value !== null){
       const charAN = new RegExp('^[A-Za-z0-9- ]+$');
       if(!charAN.test(control.value)){
           return{
               isAlphaNum: true
           }
       }
    }
    return null;
}

export function nameAndDescription(control: AbstractControl){
    if(control.value !== null){
       const charAN = new RegExp('^[A-Za-z0-9-@,.!?%&@ ]+$');
       if(!charAN.test(control.value)){
           return{
               isAlphanumeric: true
           }
       }
    }
    return null;
}





// no empty space
export function noWhitespace(control: AbstractControl){
    if(control.value !== null ){
        const regexWs = new RegExp(/^(\s+\S+\s*)*(?!\s).*$/);
        if(!regexWs.test(control.value)){
            return {
                isWhiteSpace: true
            }
        }

        // return { 
        //     'isError': true
        // }
    }
    return null;
 }


//  select 
export function selectValidation(control: AbstractControl){
    if(control.value !== null ){
        if(control.value == ""){
            return {
                isSelect: true
            }
        }
    }
    return null;
 }


 
 // validate email content template variable
export function emailTemplatevariableValidatio(DataArray:any) :ValidatorFn {
    return (control: AbstractControl):ValidationErrors | null =>  {
        let emailTemplate = control.value
        let emailContent = emailTemplate.emailTemplateContent;
        let templateVariableList:any=DataArray;
        let curlyEmailContentTempVarFound = [];
        const rxp = /{{([^}]+)}}/g;
        let  curMatch;
        while( curMatch = rxp.exec( emailContent ) ) {
        curlyEmailContentTempVarFound.push( curMatch[1] );
        }
        let totalTemplatevariable = templateVariableList?.length;
        let templateVariableKeys = [];
        for(let i = 0; i<totalTemplatevariable;i++) {
            templateVariableKeys.push(templateVariableList[i].key) ;
        }
        let isInValid = null;
        let isExist = curlyEmailContentTempVarFound.every(elem => templateVariableKeys.includes(elem));
        if(!isExist)
        return {
            isEmailTemplateVariableInValid:true
        }
        return isInValid;
    }   
}




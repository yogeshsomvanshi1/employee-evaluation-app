import {  Directive, HostListener } from '@angular/core';
@Directive({
    selector: '[validTestValue]'
  })
  export class NumberDirective {
  
    @HostListener('document:keyup', ['$event'])
    onKeyUp(event:KeyboardEvent): boolean {      
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          return false;
        }
        return true;
    
      }
  }
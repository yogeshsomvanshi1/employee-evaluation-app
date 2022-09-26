import { Directive, Input, Output, HostListener, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Directive({
    selector: '[autocompleteRef]'
})

export class AutoCompleteRefDirective {
    @Input() hasResults: boolean = false;
    @Output() change = new EventEmitter<any>();
    @Output() cancel = new EventEmitter();
    @Output() select = new EventEmitter();
    @Output() up = new EventEmitter();
    @Output() down = new EventEmitter();
    @Input('autocompleteRef') autocompleteRefParam : any;
    
    result : any;

    constructor(public http1:HttpClient){

    }

    @HostListener('input', ['$event'])
    oninput(event: any) {
        if(event.target.value){
            var charLength: any;
            charLength = event.target.value.length;
           if(charLength > 3){
            this.getUrl(this.autocompleteRefParam.url,event.target.value).subscribe(success1 => {
                this.result = success1;
                this.change.emit({param: event.target.value, resultList:  this.result});
            });
           } else {
            this.change.emit({param: event.target.value, resultList: []});
           }
           
        } else {
           this.change.emit({param: event.target.value, resultList: []});
        }
    }

    
    @HostListener('keydown', ['$event'])
    onkeydown(event: any)
    {
        switch (event.keyCode) {
            case 27:
                this.cancel.emit();
                return false;
            case 13:
                var hasResults = this.hasResults;
                this.select.emit();
                return !hasResults;
            case 38:
                this.up.emit();
                return false;
            case 40:
                this.down.emit();
                return false;
            default:
        }
      }

      getUrl(url,param): any {
        return this.http1.get(url+"/"+param);
    }

    }
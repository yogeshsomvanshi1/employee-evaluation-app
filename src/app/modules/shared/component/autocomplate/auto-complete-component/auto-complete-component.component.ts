import { Component, Input, Output, OnInit, ContentChild, EventEmitter, HostListener } from '@angular/core';
import { Observable } from "rxjs";
import { AutoCompleteRefDirective } from "../auto-complete-ref-directive.directive"

@Component({
    selector: 'app-autocomplete',
    template: `
<ng-content></ng-content>
<div class="autocomplete-wrapper" (click)="clickedInside($event)" >
    <div class="list-group autocomplete" *ngIf="results" [style.height.px]="height">
        <a  class="list-group-item" (click)="selectResult(result)"  *ngFor="let result of results; let i = index" [innerHTML]="dataMapping(result) | highlight: query" [ngClass]="{'active': i == selectedIndex}"></a>
    </div>
</div>
    `,
    styleUrls: ['./auto-complete-component.component.css'],
})
export class AutoCompleteComponent implements OnInit {
    @ContentChild(AutoCompleteRefDirective)
    public input: AutoCompleteRefDirective;

    @Input() data: (searchTerm: string) => Observable<any[]>;
    @Input() dataMapping: (obj: any) => string;
    @Output() onChange = new EventEmitter<any>();
  
    @HostListener('document:click', ['$event'])
    clickedOutside($event: any): void {
        this.clearResults();
    }

    public results: any[];
    public query: string;
    public selectedIndex: number = 0;
    public searchCounter: number = 0;
    height: number=0;
    ngOnInit(): void {
        this.input.change.subscribe((query: any) => {
                this.query = query.param;
                this.onChange.emit();
                this.searchCounter++;
                let counter = this.searchCounter;
                if (query.resultList) {
                            this.results=[];
                            if (counter == this.searchCounter) {
                              
                                this.results = query.resultList;
                                if(this.results.length==0){
                                 this.height=0;
                                }else{
                                  if(this.results.length<5){
                                    this.height=this.results.length*60;
                                  }
                                  else{
                                    this.height=200;
                                  }
                                }
                                this.input.hasResults = query.resultList.length > 0;
                                this.selectedIndex = 0;
                            }

                    // this.data(query)
                    //     .subscribe(data => {
                    //         this.results=[];
                    //         if (counter == this.searchCounter) {
                              
                    //             this.results = data;
                    //             if(this.results.length==0){
                    //              this.height=0;
                    //             }else{
                    //               if(this.results.length<5){
                    //                 this.height=this.results.length*60;
                    //               }
                    //               else{
                    //                 this.height=200;
                    //               }
                    //             }
                    //             this.input.hasResults = data.length > 0;
                    //             this.selectedIndex = 0;
                    //         }
                    //     });
                }else {
                    this.clearResults();
                };
            });

        this.input.cancel
            .subscribe(() => {
                this.clearResults();
            });

        this.input.select
            .subscribe(() => {
                if (this.results && this.results.length > 0)
                {
                  
                    this.selectResult(this.results[this.selectedIndex]);
                }
            });

        this.input.up
            .subscribe(() => {
                if (this.results && this.selectedIndex > 0) this.selectedIndex--;
            });

        this.input.down
            .subscribe(() => {
                if (this.results && this.selectedIndex + 1 < this.results.length) this.selectedIndex++;
            });
    }

    selectResult(result: any): void {
        this.height=0;
        this.onChange.emit(result);
        this.clearResults();
    }

    clickedInside($event: any): void {
        $event.preventDefault();
        $event.stopPropagation();
    }

    public clearResults(): void {
        this.height=0;
        this.results = [];
        this.selectedIndex = 0;
        this.searchCounter = 0;
        this.input.hasResults = false;
    }
}


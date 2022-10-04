import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'highlight'
})

export class HighlightPipe implements PipeTransform {
    transform(value: string, args: any): any {
        var re = new RegExp(args, 'gi');

        return value.replace(re, function (match) {
            return "<strong>" + match + "</strong>";
        })

    }
}




export class DataTableModel {
    draw: number;
    start: number;
    length: number;
    sortKey: string;
    sortType: String;
    pageno: number


    constructor(draw: number, start: number,length: number,sortKey: string,sortType: String,pageno: number) {
        this.draw= draw;
        this.start = start;
        this.length = length;
        this.sortKey = sortKey;
        this.sortType = sortType;
        this.pageno = pageno;
    }
}
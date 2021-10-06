import { ZBaseContent } from "./base-content";

export class ZContentAny extends ZBaseContent {
    delete(transaction: any) {
    }
    arr: Array<any>;

    constructor(arr: Array<any>) {
        super();
        this.arr = arr;
    }

    getLength(): number {
        return this.arr.length;
    }
    getContent(): any[] {
        return this.arr;
    }
    isCountable(): boolean {
        return true;
    }

    splice(offset: number): ZBaseContent {
        const contentAny = new ZContentAny(this.arr.slice(offset));
        this.arr = this.arr.slice(0, offset);
        return contentAny;
    }
}
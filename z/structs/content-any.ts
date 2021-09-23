import { ZBaseContent } from "./base-content";

export class ZContentAny extends ZBaseContent {
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
}
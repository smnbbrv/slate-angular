import { ZArray } from "./array";

export class ZDoc {
    client: number;
    clock: number = 0;

    content: ZArray;

    constructor() {
        this.client = Math.floor((Math.random() * Math.pow(10, 10)));
        this.content = new ZArray();
        this.content.doc = this;
        this.content.initialize();
    }

    insert(index: number, content: any[]) {
        this.content.insert(index, content);
    }

    nextClock() {
        this.clock++;
        return this.clock;
    }
}
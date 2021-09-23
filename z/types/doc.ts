import { ZArray } from "./array";
import { transact, Transaction } from "../common/transaction";

export class ZDoc {
    _Transaction: Transaction = null;

    client: number;
    clock: number = -1;
    content: ZArray;

    constructor() {
        this.client = Math.floor((Math.random() * Math.pow(10, 10)));
        this.content = new ZArray();
        this.content.doc = this;
    }

    insert(index: number, content: any[]) {
        this.content.insert(index, content);
    }

    transact(f, origin?: any, local?: boolean) {
        transact(this, f, origin, local);
    }

    nextClock() {
        this.clock++;
        return this.clock;
    }
}
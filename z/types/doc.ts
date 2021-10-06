import { ZArray } from "./array";
import { transact, Transaction } from "../common/transaction";
import { ZBaseUpdate } from "z/structs/base-update";
import { DeleteItem, DeleteSet } from "z/common/delete-set";

export class ZDoc {
    _Transaction: Transaction = null;

    client: number;
    clock: number = -1;
    content: ZArray;

    constructor() {
        this.client = Math.floor((Math.random() * Math.pow(10, 10)));
        this.content = new ZArray();
        this.content.doc = this;
        this.store = {
            clients: new Map(),
            ds: new DeleteSet()
        };
    }

    store: { clients: Map<number, Array<ZBaseUpdate>>, ds: DeleteSet }

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

    addUpdateItem(item: ZBaseUpdate) {
        const updates = this.store.clients.get(item.id.client);
        if (updates) {
            updates.push(item);
        } else {
            const updates = [item];
            this.store.clients.set(item.id.client, updates);
        }
    }

    toJSON() {
        return this.content.toJSON();
    }
}
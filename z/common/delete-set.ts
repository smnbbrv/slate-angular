import { ZItem } from "z/structs/item";
import { Transaction } from "./transaction";

export class DeleteItem {

    clock: number;

    len: number;

    constructor(clock: number, len: number) {

    }
}

export class DeleteSet {
    clients: Map<number, Array<DeleteItem>> = new Map();

    constructor() {
    }
}

export function addToDeleteSet(transaction: Transaction, item: ZItem) {
    const ds = transaction.doc.store.ds;
    let clientDeleteSet = ds.clients.get(item.id.client);
    if (!clientDeleteSet) {
        clientDeleteSet = [];
    }
    clientDeleteSet.push(new DeleteItem(item.id.clock, item.length));
}
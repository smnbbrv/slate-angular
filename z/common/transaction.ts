import { ZDoc } from "../types/doc";

export function transact(doc: ZDoc, f, origin = null, local = true) {
    if (doc._Transaction === null) {
        doc._Transaction = new Transaction(doc, origin, local);
    }
    try {
        f(doc._Transaction);
    } finally {
        
    }
}

export class Transaction {
    doc: ZDoc;
    origin: any;
    local: boolean;
    constructor(doc, origin, local) {
        this.doc = doc;
        this.origin = origin;
        this.local = local;
    }
}
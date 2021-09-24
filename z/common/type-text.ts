import { ZText } from "z/types/text";
import { Transaction } from "./transaction";
import { ZContentString } from '../structs/content-string';
import { ZItem } from "z/structs/item";
import { createID } from "./id";

export function typeTextInsertGenerics(transaction: Transaction, parent: ZText, offset: number, text: String) {
    if (offset === 0) {
        const contentString = new ZContentString(text);
        const item = new ZItem(createID(transaction.doc, transaction.doc.client), null, null, null, null, parent, null, contentString);
        item.integrate(transaction, 0);
        parent._start = item;
        return;
    }
    
}
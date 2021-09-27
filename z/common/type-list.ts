import { ZContentType } from "z/structs/content-type";
import { ZItem } from "z/structs/item";
import { ZBaseType } from "z/types/base-type";
import { createID } from "./id";
import { Transaction } from "./transaction";

export function typeListInsertGenerics(transaction: Transaction, parent: ZBaseType, index: number, content: Array<any>) {
    if (index === 0) {
        typeListInsertGenericsAfter(transaction, parent, null, content);
        return;
    }
    let left = null;
    typeListInsertGenericsAfter(transaction, parent, left, content);
}

export function typeListInsertGenericsAfter(transaction: Transaction, parent: ZBaseType, referenceItem: ZItem, content: Array<any>) {
    let left = referenceItem;
    let right = referenceItem ? referenceItem.right : null;

    content.forEach((c) => {
        if (c instanceof ZBaseType) {
            left = new ZItem(createID(transaction.doc, transaction.doc.client), left, left?.lastId, right, right?.id, parent, null, new ZContentType(c));
            left.integrate(transaction, 0);
            if (!parent._start) {
                parent._start = left;
            }
        }
    });
}

export function typeListGet(type: ZBaseType, index: number) {
    let n = type._start;
    while(n) {
        if (index < n.length) {
            return n.content.getContent()[index];
        }
        index -= n.length;
        n = n.right;
    }
}
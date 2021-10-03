import { ZContentType } from "z/structs/content-type";
import { ZItem } from "z/structs/item";
import { ZBaseType } from "z/types/base-type";
import { createID } from "./id";
import { Transaction } from "./transaction";

export class ZPosition {
    left: ZItem | null;
    right: ZItem | null;
    index: number;
    constructor(left: ZItem | null, right: ZItem | null, index: number) {
        this.left = left;
        this.right = right;
        this.index = index;
    }
}

export function typeListInsertGenerics(transaction: Transaction, parent: ZBaseType, index: number, content: Array<any>) {
    if (index === 0) {
        typeListInsertGenericsAfter(transaction, parent, null, content);
        return;
    }
    let left = parent._start;
    while (left && index > 1) {
        left = left.right;
        index--;
    }
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
    while (n) {
        if (index < n.length) {
            return n.content.getContent()[index];
        }
        index -= n.length;
        n = n.right;
    }
}

export function typeListDelete(transaction: Transaction, type: ZBaseType, index: number, length: number) {
    const zPosition = findPosition(type, index);
    let count = length;
    while (zPosition.right && count > 0) {
        if (!zPosition.right.deleted) {
            count--;
        }
        zPosition.right.delete(transaction);
        zPosition.left = zPosition.right;
        zPosition.right = zPosition.right.right;
    }
}

export function findPosition(type: ZBaseType, index: number) {
    const zPosition = new ZPosition(null, type._start, 0);
    findNextPosition(zPosition, index);
    return zPosition;
}

export function findNextPosition(zPosition: ZPosition, count: number) {
    while (zPosition.right && count > 0) {
        if (!zPosition.right.deleted) {
            count--;
        }
        zPosition.left = zPosition.right;
        zPosition.right = zPosition.right.right;
    }
}
import { ZText } from "z/types/text";
import { Transaction } from "./transaction";
import { ZContentString } from '../structs/content-string';
import { splitItem, ZItem } from "z/structs/item";
import { createID } from "./id";

export class ZTextPosition {
    left: ZItem | null;
    right: ZItem | null;
    index: number;
    constructor(left: ZItem | null, right: ZItem | null, index: number) {
        this.left = left;
        this.right = right;
        this.index = index;
    }
}

export function typeTextInsert(transaction: Transaction, parent: ZText, offset: number, text: String) {
    const textPosition = findPosition(transaction, parent, offset);
    const contentString = new ZContentString(text);
    const item = new ZItem(createID(transaction.doc, transaction.doc.client), textPosition.left, textPosition.left && textPosition.left.lastId, textPosition.right, textPosition.right && textPosition.right.lastId, parent, null, contentString);
    item.integrate(transaction, 0);
    if (!parent._start) {
        parent._start = item;
    }
}

export function typeTextDelete(transaction: Transaction, parent: ZText, offset: number, length: number) {
    const textPosition = findPosition(transaction, parent, offset);
    let count = length;
    while (textPosition.right !== null && count > 0) {
        if (count < textPosition.right.length) {
            // split_item
            splitItem(transaction, textPosition.right, count);
        }
        textPosition.right.delete(transaction);
        count -= textPosition.right.length;
        textPosition.left = textPosition.right;
        textPosition.right = textPosition.right.right;
    }
}

export function findPosition(transaction: Transaction, text: ZText, index: number) {
    const textPosition = new ZTextPosition(null, text._start, 0);
    findNextPosition(transaction, textPosition, index);
    return textPosition;
}

export function findNextPosition(transaction: Transaction, textPosition: ZTextPosition, count: number) {
    while (textPosition.right) {

        if (textPosition.right.length === 0 || textPosition.right.deleted) {
            textPosition.left = textPosition.right;
            textPosition.right = textPosition.right.right;
            continue;
        }

        if (count === 0) {
            break;
        }


        if (!textPosition.right.deleted && textPosition.right.content instanceof ZContentString && textPosition.right.length > 0) {
            if (count < textPosition.right.length) {
                // split_item
                splitItem(transaction, textPosition.right, count);
            }
            textPosition.index += textPosition.right.length;
            count -= textPosition.right.length;
        }

        textPosition.left = textPosition.right;
        textPosition.right = textPosition.right.right;
    }
}
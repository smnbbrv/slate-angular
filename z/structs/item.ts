import { createID, ID } from "z/common/id";
import { Transaction } from "z/common/transaction";
import { ZBaseType } from "z/types/base-type";
import { ZBaseContent } from "./base-content";
import { ZBaseUpdate } from "./base-update";
import { ZContentString } from "./content-string";
import { ZContentType } from "./content-type";

export class ZItem extends ZBaseUpdate {
    left: ZItem | null;
    origin: ID | null;
    right: ZItem | null;
    rightOrigin: ID | null;
    parent: ZBaseType | ID | null;
    parentSub: string | null;
    content: ZBaseContent;

    constructor(id: ID, left: ZItem | null, origin: ID | null, right: ZItem | null, rightOrigin: ID | null, parent: ZBaseType | ID | null, parentSub: string | null, content: ZBaseContent) {
        super(id, content.getLength());
        this.left = left;
        if (left) {
            left.right = this;
        }
        this.origin = origin;
        this.right = right;
        this.rightOrigin = rightOrigin;
        this.parent = parent;
        this.parentSub = parentSub;
        this.content = content;
    }

    get deleted(): boolean {
        throw new Error("Method not implemented.");
    }

    get lastId() {
        if (this.length === 1) {
            this.id;
        } else {
            return new ID(this.id.client, this.id.clock + this.length - 1);
        }
    }

    integrate(transaction: Transaction, offset: number) {
        transaction.doc.addUpdateItem(this);
        if (this.content instanceof ZContentType) {
            this.content.type._integrate(transaction.doc, this);
        }
    }
};

export function splitItem(transaction: Transaction, left: ZItem, count: number) {
    const updates = transaction.doc.stores.client.get(transaction.doc.client);
    const index = updates.findIndex((value) => value === left);
    const newRightItem = new ZItem(new ID(transaction.doc.client, left.id.clock + count), left, new ID(transaction.doc.client, left.id.clock + count - 1), left.right, left.right?.id, left.parent, left.parentSub, left.content.splice(count));
    left.right = newRightItem;
    left.rightOrigin = newRightItem.id;
    left.length = count;
    if (newRightItem.right !== null) {
        newRightItem.right.left = newRightItem;
    }
    updates.splice(index + 1, 0, newRightItem);
}
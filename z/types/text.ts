import { transact, Transaction } from "z/common/transaction";
import { typeTextDelete, typeTextInsert } from "z/common/type-text";
import { ZContentString } from "z/structs/content-string";
import { ZItem } from "z/structs/item";
import { ZBaseType } from "./base-type";
import { ZDoc } from "./doc";

export class ZText extends ZBaseType {
    _pending: (() => void)[];

    constructor(text: String) {
        super();
        this._pending = [() => {
            this.insert(0, text, null);
        }];
    }

    delete(offset: number, length: number) {
        if (this.doc !== null) {
            transact(this.doc, (transaction: Transaction) => {
                this._length -= length;
                typeTextDelete(transaction, this, offset, length);
            });
        } else {
            this._pending = [() => {
                this.delete(offset, length);
            }];
        }
    }

    insert(offset: number, text: String, attributes?: Object) {
        if (this.doc !== null) {
            transact(this.doc, (transaction: Transaction) => {
                this._length += text.length;
                typeTextInsert(transaction, this, offset, text);
            })
        } else {
            this._pending = [() => {
                this.insert(offset, text, null);
            }];
        }
    }

    _integrate(doc: ZDoc, item: ZItem) {
        super._integrate(doc, item);
        this._pending.forEach((f) => f());
        this._pending = null;
    }

    get length() {
        return this._length;
    }

    toString() {
        let str = '';
        let right = this._start;
        while (right) {
            if (!right.deleted && right.content instanceof ZContentString) {
                str += right.content.str;
            }
            right = right.right;
        }
        return str;
    }

    toJSON() {
        return this.toString();
    }
}
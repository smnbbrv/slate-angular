import { ZBaseType } from "./base-type";
import { transact, Transaction } from "../common/transaction";
import { typeListDelete, typeListGet, typeListInsertGenerics } from "z/common/type-list";
import { ZMap } from "./map";

export class ZArray extends ZBaseType {
    _prelimContent: Array<any> = [];

    insert(index: number, content: any[]) {
        if (this.doc !== null) {
            transact(this.doc, (transaction: Transaction) => {
                this._length += content.length;
                typeListInsertGenerics(transaction, this, index, content);
            });
        } else {
            this._prelimContent.splice(index, 0, ...content);
        }
    }

    delete(index: number, length?: number | undefined) {
        transact(this.doc, (transaction: Transaction) => {
            this._length -= length;
            typeListDelete(transaction, this, index, length);
        });
    }

    findItemByIndex(index: number) {
    }

    _integrate(doc, item) {
        super._integrate(doc, item);
        this.insert(0, this._prelimContent);
        this._prelimContent = null;
    }

    get(index: number) {
        return typeListGet(this, index);
    }

    get length() {
        // return this._prelimContent === null ? this._length : this._prelimContent.length
        return this._length;
    }

    map(callbackFn: (zMap: ZMap) => {}) {
        let right = this._start;
        const ret = [];
        while (right) {
            ret.push(callbackFn(right.content.getContent()[0]));
            right = right.right;
        }
        return ret;
    }
}


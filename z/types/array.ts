import { ZBaseType } from "./base-type";
import { transact, Transaction } from "../common/transaction";
import { typeListInsertGenerics } from "z/common/type-list";

export class ZArray extends ZBaseType {
    _prelimContent: Array<any> = [];

    insert(index: number, content: any[]) {
        if (this.doc !== null) {
            transact(this.doc, (transaction: Transaction) => {
                typeListInsertGenerics(transaction, this, index, content);
            });
        } else {
            this._prelimContent.splice(index, 0, ...content);
        }
    }

    delete(index: number) {
    }

    findItemByIndex(index: number) {
    }

    _integrate(doc, item) {
        super._integrate(doc, item);
        this.insert(0, this._prelimContent);
        this._prelimContent = null;
    }
}


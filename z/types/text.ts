import { transact, Transaction } from "z/common/transaction";
import { typeTextInsertGenerics } from "z/common/type-text";
import { ZItem } from "z/structs/item";
import { ZBaseType } from "./base-type";
import { ZDoc } from "./doc";

export class ZText extends ZBaseType {
    _prelimContent: String;

    constructor(text: String) {
        super();
        this._prelimContent = text;
    }

    delete(offset: number, length: number) {

    }

    insert(offset: number, text: String, attributes?: Object) {
        if (this.doc !== null) {
            transact(this.doc, (transaction: Transaction) => {
                typeTextInsertGenerics(transaction, this, offset, text);
            })
        } else {
            // this._prelimContent
        }
    }

    _integrate(doc: ZDoc, item: ZItem) {
        super._integrate(doc, item);
        this.insert(0, this._prelimContent);
        this._prelimContent = null;
    }
}
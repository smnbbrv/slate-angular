import { ZContentAny } from "z/structs/content-any";
import { ZContentType } from "z/structs/content-type";
import { ZItem } from "z/structs/item";
import { ZBaseType } from "z/types/base-type";
import { ZMap } from "z/types/map";
import { createID } from "./id";
import { Transaction } from "./transaction";

export function typeMapSet(transaction: Transaction, parent: ZMap, key: string, value: any) {
    const left = parent._map.get(key) || null;
    let content;
    if (value instanceof ZBaseType) {
        content = new ZContentType(value);
    } else {
        content = new ZContentAny([value]);
    }
    const item = new ZItem(createID(transaction.doc, transaction.doc.client), left, left?.lastId, null, null, this, key, content);
    item.integrate(transaction, 0);
    parent._map.set(key, item);
}
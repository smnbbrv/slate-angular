import { ZDoc } from "./doc";
import { ZItem } from "../structs/item";

export class ZBaseType {
    _item: ZItem | null;
    _map = new Map<string, ZItem>();
    _start: ZItem | null = null;
    doc: ZDoc | null = null;
    _length: number = 0;

    _integrate(doc: ZDoc, item: ZItem) {
        this.doc = doc;
        this._item = item;
    }

    get parent() {
        return this._item ? this._item.parent : null;
    }
}
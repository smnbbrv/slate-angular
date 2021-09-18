import { ZDoc } from "./doc";
import { ZItem } from "./item";

export class ZMap extends ZItem {
    _map: Map<string, ZItem>;

    constructor() {
        super();
        this._map = new Map();
    }

    set(key: string, value: any) {
        if (value instanceof ZItem) {
            this._map.set(key, value);
            value.doc = this.doc;
            value.parent = this;
            value.mapKey = key;
            value.initialize();
        } else {
            const item = new ZItem();
            item.content = value;
            item.parent = this;
            item.mapKey = key;
            item.doc = this.doc;
            item.initialize();
            this._map.set(key, item);
        }
    }



    get(key: string) {
        return this._map.get(key);
    }

    delete(key: string) {
        const item = this.get(key);
        item.isDelete = true;
        this._map.delete(key);
    }

    initialize() {
        if (!this.id) {
            super.initialize();
            for (const iterator of this._map.entries()) {
                if (iterator[1] instanceof ZItem) {
                    if (!iterator[1].id) {
                        iterator[1].doc = this.doc;
                        iterator[1].initialize();
                    }
                }
                if (iterator[1].content instanceof ZItem) {
                    if (!iterator[1].content.id) {
                        iterator[1].content.doc = this.doc;
                        iterator[1].content.initialize();
                    }
                }
            }
        }
    }
}
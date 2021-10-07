import { ZBaseType } from "z/types/base-type";
import { ZBaseContent } from "./base-content";

export const ZArrayRefID = 0;
export const ZMapRefID = 1;
export const ZTextRefID = 2;

export class ZContentType extends ZBaseContent {
    splice(offset: any): ZBaseContent {
        throw new Error("Method not implemented.");
    }

    type: ZBaseType;

    constructor(type: ZBaseType) {
        super();
        this.type = type;
    }

    getLength(): number {
        return 1;
    }

    getContent(): any[] {
        return [this.type];
    }

    isCountable(): boolean {
        return true;
    }

    delete(transaction: any) {
        if (this.type._map) {
            for (const [key, item] of this.type._map.entries()) {
                item.delete(transaction);
            }
        }
        if (this.type._start) {
            let right = this.type._start;
            while (right) {
                right.delete(transaction);
                right = right.right;
            }
        }
    }

    getRef() {
        return 7;
    }
}
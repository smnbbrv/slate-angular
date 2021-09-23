import { ZBaseType } from "z/types/base-type";
import { ZBaseContent } from "./base-content";

export class ZContentType extends ZBaseContent {
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
}
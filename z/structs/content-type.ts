import { ZBaseType } from "z/types/base-type";
import { ZBaseContent } from "./base-content";

export class ZContentType extends ZBaseContent {
    delete(transaction: any) {
        throw new Error("Method not implemented.");
    }
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
}
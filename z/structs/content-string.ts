import { ZBaseContent } from "./base-content";

export class ZContentString extends ZBaseContent {
    str: String;

    constructor(str: String) {
        super();
        this.str = str;
    }

    getLength(): number {
        return this.str.length;
    }

    getContent(): any[] {
        return this.str.split('');
    }
    isCountable(): boolean {
        return true;
    }
}
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

    splice(offset: number): ZBaseContent {
        const contentString = new ZContentString(this.str.slice(offset));
        this.str = this.str.slice(0, offset);
        return contentString;
    }

    delete(transaction: any) {
    }

    getRef() {
        return 4;
    }
}
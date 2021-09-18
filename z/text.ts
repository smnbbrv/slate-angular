import { ZDoc } from "./doc";
import { ZItem } from "./item";

export class ZText extends ZItem {
    linked: ZItem;

    parent: ZItem;

    get start() {
        return this.linked;
    }

    constructor(text: string) {
        super();
        this.linked = new ZItem();
        this.linked.content = text;
    }

    initialize() {
        if (!this.id && this.doc) {
            super.initialize();
            if (!this.start) {
                return;
            }
            if (!this.start.id) {
                this.start.doc = this.doc;
                this.start.initialize();
            }
        }
    }
}
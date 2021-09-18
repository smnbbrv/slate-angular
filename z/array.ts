import { ZItem } from "./item";

export class ZArray extends ZItem {
    
    linked: ZItem;

    get start() {
        return this.linked;
    }

    insert(index: number, content: any[]) {
        const item = this.findItemByIndex(index - 1);
        let newItem: ZItem | ZArray;
        if (content.length === 1) {
            newItem = new ZItem();
            newItem.content = content[0];
            if (newItem.content instanceof ZItem) {
                newItem.content.doc = this.doc;
                newItem.content.initialize();
            }
            newItem.doc = this.doc;
            newItem.initialize();
            if (item) {
                const right = item.right;
                newItem.right = right;
                newItem.left = item;
                right.left = newItem;
            } else {
                if (this.linked) {
                    newItem.right = this.linked;
                    this.linked.left = newItem;
                    this.linked = newItem;
                } else {
                    this.linked = newItem;
                }
            }
        } else {
            let left = item;
            content.forEach((value) => {
                const newItem = new ZItem();
                newItem.content = value;
                if (this.doc) {
                    newItem.doc = this.doc;
                    newItem.initialize();
                }
                if (left) {
                    const right = left.right;
                    left.right = newItem;
                    newItem.left = left;
                    if (right) {
                        newItem.right = right;
                        right.left = newItem;
                    }
                } else {
                    if (this.linked) {
                        newItem.right = this.linked;
                        this.linked.left = newItem;
                        this.linked = newItem;
                    } else {
                        this.linked = newItem;
                    }
                }
                left = newItem;
            });
            if (!this.id) {
                this.start.doc = this.doc;
                this.start.initialize();
            }
        }
    }

    delete(index: number) {
        const item = this.findItemByIndex(index - 1);
        item.isDelete = true;
    }

    findItemByIndex(index: number) {
        let currentIndex = 0;
        let currentItem = this.start;
        while (currentIndex < index) {
            currentIndex += currentItem.length;
            currentItem = currentItem.right;
        }

        if (currentIndex === index) {
            return currentItem;
        }
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
            let right = this.start.content;
            while (right && right instanceof ZItem && !right.id) {
                right.doc = this.doc;
                right.initialize();
                if (right.content && right.content instanceof ZItem && !right.content.id) {
                    right.content.doc = this.doc;
                    right.content.initialize();
                }
                right = right.right;
            }
        }
    }
}
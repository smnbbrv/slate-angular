import { ID } from "z/common/id";
import { Transaction } from "z/common/transaction";
import { ZBaseType } from "z/types/base-type";
import { ZBaseContent } from "./base-content";
import { ZBaseUpdate } from "./base-update";
import { ZContentType } from "./content-type";

export class ZItem extends ZBaseUpdate {
    left: ZItem | null;
    origin: ID | null;
    right: ZItem | null;
    rightOrigin: ID | null;
    parent: ZBaseType | ID | null;
    parentSub: string | null;
    content: ZBaseContent;

    constructor(id: ID, left: ZItem | null, origin: ID | null, right: ZItem | null, rightOrigin: ID | null, parent: ZBaseType | ID | null, parentSub: string | null, content: ZBaseContent) {
        super(id, content.getLength());
        this.left = left;
        this.origin = origin;
        this.right = right;
        this.rightOrigin = rightOrigin;
        this.parent = parent;
        this.parentSub = parentSub;
        this.content = content;
    }

    get deleted(): boolean {
        throw new Error("Method not implemented.");
    }

    integrate(transaction: Transaction, offset: number) {
        if (this.content instanceof ZContentType) {
            this.content.type._integrate(transaction.doc, this);
        }
    }
};

import { ZDoc } from "./doc";

export class ZItem {
    id: Id;

    content: any;

    parent: ZItem;

    originParent: Id;

    left: ZItem;

    leftOrigin: Id;

    right: ZItem;

    rightOrigin: Id;

    origin: Id;
    
    isDelete: boolean;

    length: number;

    doc: ZDoc;

    mapKey: string;

    isText: true;
    
    constructor() {
    }

    initialize() {
        if (this.doc) {
            this.id = new Id(this.doc.client, this.doc.nextClock());
        }
    }
};

export class Id {
    client: number;
    clock: number;
    constructor(client, clock) {
        this.client = client;
        this.clock = clock;
    }
}
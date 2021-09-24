import { ZDoc } from "z/types/doc";

export class ID {
    client: number;
    clock: number;
    constructor(client: number, clock: number) {
        this.client = client;
        this.clock = clock;
    }
}

export function createID(doc: ZDoc, client: number) {
    const clock = getClientMaxClock(doc, client);
    return new ID(client, clock);
}

export function getClientMaxClock(doc: ZDoc, client: number) {
    const updates = doc.stores.client.get(client);
    if (updates && updates.length > 0) {
        const updateItem = updates[updates.length - 1];
        return updateItem.id.clock + updateItem.length;
    } else {
        return 0;
    }
}
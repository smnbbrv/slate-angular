export class ID {
    client: number;
    clock: number;
    constructor(client: number, clock: number) {
        this.client = client;
        this.clock = clock;
    }
}

export function createID(client, clock) {
    return new ID(client, clock);
}
import { Transaction } from "z/common/transaction";
import { ID } from "../common/id";

export abstract class ZBaseUpdate {
    id: ID;
    length: number;
    constructor(id, length) {
        this.id = id;
        this.length = length;
    }

    abstract get deleted(): boolean;

    abstract integrate(transaction: Transaction, offset: number);
}
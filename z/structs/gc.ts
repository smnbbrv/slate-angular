import { Transaction } from "z/common/transaction";
import { ZBaseUpdate } from "./base-update";

export class GC extends ZBaseUpdate {
    get deleted(): boolean {
        throw new Error("Method not implemented.");
    }
    integrate(transaction: Transaction, offset: number) {
        throw new Error("Method not implemented.");
    }
}
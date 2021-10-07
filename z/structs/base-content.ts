export abstract class ZBaseContent {
    abstract getLength(): number;
    abstract getContent(): Array<any>;
    abstract isCountable(): boolean;
    abstract splice(offset): ZBaseContent;
    abstract delete(transaction);
    abstract getRef(): number;
}
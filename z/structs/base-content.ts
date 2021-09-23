export abstract class ZBaseContent {
    abstract getLength (): number;
    abstract getContent (): Array<any>;
    abstract isCountable(): boolean;
}
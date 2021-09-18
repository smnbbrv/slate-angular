export class ZUpdateItemBase {
    path: any[];
    type: 'map_set' | 'map_delete' | 'array_insert' | 'array_delete';
}

export class ZMapSetUpdateItem extends ZUpdateItemBase {
    constructor() {
        super();
        this.type = 'map_set';
    }
    key: string;
    value: any;
}

export class ZMapDeleteUpdateItem extends ZUpdateItemBase {
    constructor() {
        super();
        this.type = 'map_delete';
    }
    key: string;
}
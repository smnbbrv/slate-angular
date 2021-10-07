import { ZContentAny } from "z/structs/content-any";
import { ZContentString } from "z/structs/content-string";
import { ZContentType } from "z/structs/content-type";
import { ZItem } from "z/structs/item";
import { ZDoc } from "z/types/doc";
import { ZContentStruct } from "./content-struct";
import { DeleteSet } from "./delete-set";

export function applyUpdates(doc: ZDoc, items: ZItem[], ds: DeleteSet) {

}

export function generateUpdates(doc: ZDoc) {
    const items = [];
    for (const [client, updates] of doc.store.clients) {
        updates.forEach((update: ZItem) => {
            let contentData;
            if (update.content instanceof ZContentType) {
                contentData = update.content.type.getRefID();
            }
            if (update.content instanceof ZContentString) {
                contentData = update.content.getContent();
            }
            if (update.content instanceof ZContentAny) {
                contentData = update.content.getContent();
            }
            items.push({
                id: update.id,
                origin: update.origin,
                rightOrigin: update.rightOrigin,
                content: new ZContentStruct(update.content.getRef(), contentData)
            });
        });
    }
    return items;
}
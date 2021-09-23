import { Descendant, Element, Text, Node } from "slate";
import { ZArray } from "z/types/array";
import { ZDoc } from "z/doc";
import { ZMap } from "z/map";
import { ZText } from "z/text";

export function toZDoc(children: Descendant[]): ZDoc {
    const zdoc = new ZDoc()
    zdoc.insert(0, children.map((value ) => {
      return toZMap(value);
    }));
    return zdoc;
}

export function toZMap(node: Node): ZMap {
    const element: ZMap = new ZMap();
  
    if (Element.isElement(node)) {
      const childElements = (node.children as any).map((value ) => {
        return toZMap(value);
      });
      const childContainer = new ZArray();
      childContainer.insert(0, childElements);
      element.set('children', childContainer);
    }
  
    if (Text.isText(node)) {
      const textElement = new ZText(node.text);
      element.set('text', textElement);
    }
  
    Object.entries(node).forEach(([key, value]) => {
      if (key !== 'children' && key !== 'text') {
        element.set(key, value);
      }
    });
  
    return element;
  }

export function toSlateDoc(zdoc: ZDoc): Descendant[] {
    
    return [];
}
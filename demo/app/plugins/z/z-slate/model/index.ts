import { Descendant, Path, Range } from 'slate';
import { ZArray } from 'z/types/array';
import { ZMap } from 'z/types/map';
import { ZText } from 'z/types/text';

export type SyncElement = ZMap;
export type SharedType = ZArray;
export type SyncNode = SharedType | SyncElement;

export interface Cursor extends Range {
  data: {
    [key: string]: unknown;
  };
}
export interface CursorInfo extends Cursor{
  isForward: boolean;
  originAnchorPath: Path;
  originFocusPath: Path;
}

export interface CustomNode extends Node{
  [key: string]: any;
  children?: Descendant[];
}


export const SyncElement = {
  getText(element: SyncElement): ZText | undefined {
    return element?.get('text') as any;
  },

  getChildren(element: SyncElement): ZArray | undefined {
    return element?.get('children') as any;
  }
};

export const SyncNode = {
  getChildren(node: SyncNode): ZArray | undefined {
    if (node instanceof ZArray) {
      return node;
    }

    return SyncElement.getChildren(node);
  },

  getText(node: SyncNode): ZText | undefined {
    if (node instanceof ZArray) {
      return undefined;
    }

    return SyncElement.getText(node);
  },

  getFirstText(node: SyncNode): ZText {
    let text = SyncElement.getText(node as SyncElement);
    if (text) {
      return text;
    }
    const children = SyncNode.getChildren(node);
    const firstChild = children?.get(0);
    return SyncNode.getFirstText(firstChild as SyncNode);
  }
};

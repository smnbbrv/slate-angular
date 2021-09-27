import { Path } from 'slate';
import { ZItem } from 'z/structs/item';
import { ZArray } from 'z/types/array';
import { ZMap } from 'z/types/map';
import { SharedType, SyncNode } from '../model';

const isTree = (node: SyncNode): boolean => !!SyncNode.getChildren(node);

/**
 * Returns the SyncNode referenced by the path
 *
 * @param doc
 * @param path
 */
export function getTarget(doc: SharedType, path: Path): SyncNode {
  function iterate(current: SyncNode, idx: number) {
    const children = SyncNode.getChildren(current);

    if (!isTree(current) || !children?.get(idx)) {
      throw new TypeError(
        `path ${path.toString()} does not match doc`
      );
    }

    return children.get(idx);
  }

  return path.reduce<SyncNode>(iterate, doc);
}

function getParentPath(path: Path, level = 1): [number, Path] {
  if (level > path.length) {
    throw new TypeError('requested ancestor is higher than root');
  }

  return [path[path.length - level], path.slice(0, path.length - level)];
}

export function getParent(
  doc: SharedType,
  path: Path,
  level = 1
): [SyncNode, number] {
  const [idx, parentPath] = getParentPath(path, level);
  const parent = getTarget(doc, parentPath);
  return [parent, idx];
}

/**
 * Returns the position of the sync item inside inside it's parent array.
 *
 * @param item
 */
export function getArrayPosition(item: ZItem): number {
  let i = 0;
  let c = (item.parent as ZArray)._start;

  while (c !== item && c !== null) {
    if (!c.deleted) {
      i += 1;
    }
    c = c.right;
  }

  return i;
}

/**
 * Returns the document path of a sync item
 *
 * @param node
 */
export function getSyncNodePath(node: SyncNode): Path {
  if (!node) {
    return [];
  }

  const { parent } = node;
  if (!parent) {
    return [];
  }

  if (parent instanceof ZArray) {
    return [...getSyncNodePath(parent), getArrayPosition(node._item)];
  }

  if (parent instanceof ZMap) {
    return getSyncNodePath(parent);
  }

  throw new Error(`Unknown parent type ${parent}`);
}

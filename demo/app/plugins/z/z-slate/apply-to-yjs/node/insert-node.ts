import { InsertNodeOperation } from 'slate';
import { SharedType, SyncNode } from '../../model';
import { getParent } from '../../path';
import { toZMap } from '../../utils/convert';

/**
 * Applies an insert node operation to a SharedType.
 *
 * @param doc
 * @param op
 */
export default function insertNode(
  doc: SharedType,
  op: InsertNodeOperation
): SharedType {
  const [parent, index] = getParent(doc, op.path);

  const children = SyncNode.getChildren(parent);
  if (SyncNode.getText(parent) !== undefined || !children) {
    throw new TypeError('Can\'t insert node into text node');
  }

  children.insert(index, [toZMap(op.node)]);
  return doc;
}

import { RemoveNodeOperation } from 'slate';
import { SharedType, SyncNode } from '../../model';
import { getParent } from '../../path';

/**
 * Applies a remove node operation to a SharedType.
 *
 * @param doc
 * @param op
 */
export default function removeNode(
  doc: SharedType,
  op: RemoveNodeOperation
): SharedType {
  const [parent, index] = getParent(doc, op.path);

  if (SyncNode.getText(parent) !== undefined) {
    throw new TypeError('Can\'t insert node into text node');
  }

  const children = SyncNode.getChildren(parent);
  children.delete(index);

  return doc;
}

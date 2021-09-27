import { MergeNodeOperation } from 'slate';
import { SharedType, SyncNode } from '../../model';
import { getParent } from '../../path';
import cloneSyncElement from '../../utils/clone';

/**
 * Applies a merge node operation to a SharedType.
 *
 * @param doc
 * @param op
 */
export default function mergeNode(
  doc: SharedType,
  op: MergeNodeOperation
): SharedType {
  const [parent, index] = getParent(doc, op.path);

  const children = SyncNode.getChildren(parent);

  const prev = children.get(index - 1);
  const next = children.get(index);

  const prevText = SyncNode.getText(prev);
  const nextText = SyncNode.getText(next);

  // if (prevText && nextText) {
  //   prevText.insert(prevText.length, nextText.toString());
  // } else {
  //   const nextChildren = SyncNode.getChildren(next);
  //   const prevChildren = SyncNode.getChildren(prev);

  //   const toPush = nextChildren.map(cloneSyncElement);
  //   prevChildren.push(toPush);
  // }

  // children.delete(index, 1);
  return doc;
}

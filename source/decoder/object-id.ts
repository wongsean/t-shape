import * as D from "io-ts/lib/Decoder";
import { ObjectId } from "bson";

export interface ObjectIDBrand {
  readonly ObjectID: unique symbol;
}

export type ObjectID = string & ObjectIDBrand;

export const ObjectID: D.Decoder<ObjectID> = D.refinement(
  D.string,
  (s): s is ObjectID => ObjectId.isValid(s),
  "ObjectID"
);

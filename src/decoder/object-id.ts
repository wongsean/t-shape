import * as D from "io-ts/lib/Decoder";
import { ObjectId } from "bson";
import { pipe } from "fp-ts/lib/pipeable";

export interface ObjectIDBrand {
  readonly ObjectID: unique symbol;
}

export type ObjectID = string & ObjectIDBrand;

export const ObjectID: D.Decoder<unknown, ObjectID> = pipe(
  D.string,
  D.refine((s): s is ObjectID => ObjectId.isValid(s), "ObjectID")
);

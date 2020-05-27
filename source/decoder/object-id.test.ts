import { ObjectID } from "./object-id";
import { isRight } from "fp-ts/lib/Either";

test("decode", () => {
  const maybe1 = ObjectID.decode("123");
  expect(isRight(maybe1)).toBeFalsy();

  const maybe2 = ObjectID.decode(123);
  expect(isRight(maybe2)).toBeFalsy();

  const maybe3 = ObjectID.decode("5e280bc25a851cbc51be07e4");
  expect(isRight(maybe3)).toBeTruthy();
});

// test type
function passObjectId(id: ObjectID) {
  return id;
}

function passString(id: string) {
  return id;
}

function passNumber(id: number) {
  return id;
}

const maybe = ObjectID.decode("5e280bc25a851cbc51be07e4");

if (isRight(maybe)) {
  const id = maybe.right;

  // can pass as ObjectID
  passObjectId(id);

  // can pass as string
  passString(id);

  // can't pass as other type like number
  // @ts-expect-error
  passNumber(id);

  // can't pass string as ObjectID
  // @ts-expect-error
  passObjectId("5e280bc25a851cbc51be07e4");
}

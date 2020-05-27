## Installation

`npm i toa-sharp`

## Usage

Let say we are using koa with body parse, we used to have to assume type and do assertion manually and seperately

```typescript
async function handler(ctx: Context) {
  const { author, text } = ctx.request.body as {
    author: string;
    text: string;
    replyTo?: string;
  };

  ctx.assert(typeof author === "string" && ObjectId.isValid(author));
  ctx.assert(typeof text === "string");
  ctx.assert(
    !replyTo || (typeof replyTo === "string" && ObjectId.isValid(replyTo))
  );

  // using it
}
```

With Sharp,

```typescript
import { Sharp, assert } from "toa-sharp";
import { Errors } from "./errors";

const RequestBody = Sharp.make(
  (s) =>
    s.Type({
      author: s.ObjectID,
      text: s.String,
      replyTo: s.Optional(s.ObjectID),
    }),
  { throwWith: Errors.InvalidParams }
);

async function handler(ctx: Context) {
  assert(ctx.request.body, RequestBody);
  const { author, text, replyTo } = ctx.request.body;
  // type => {
  //   author: ObjectID
  //   text: string
  //   replyTo: ObjectID | undefined
  // }

  // ObjectID is a branded string, just treat it as a string
}
```

## Roadmap

[ ] Add branded type such as Int(number), Positive(number), Email(string), Url(string), etc.

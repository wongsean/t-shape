import { fromGuard } from "io-ts/lib/Decoder";
import { Guard } from "io-ts/lib/Guard";

export const unknownGuard: Guard<unknown, unknown> = {
  is: (_: unknown): _ is unknown => true,
};

export const unknown = fromGuard(unknownGuard, "unknown");

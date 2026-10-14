import type { Business } from "../../types/game";

import { farms } from "./farms";
import { workshops } from "./workshops";
import { industry } from "./industry";
import { factories } from "./factories";

export const businesses: Business[] = [
    ...farms,
    ...workshops,
    ...industry,
    ...factories,
];
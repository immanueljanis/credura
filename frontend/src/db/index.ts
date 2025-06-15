
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon("postgresql://credura_owner:npg_k0Dcjp8MUrIZ@ep-patient-breeze-a1d20v04-pooler.ap-southeast-1.aws.neon.tech/credura?sslmode=require");
export const db = drizzle({ client: sql });

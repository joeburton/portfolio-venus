// Regenerates projects.body.json (the request body for POST /api/work/bulk-add)
// from the canonical seed data in src/app/api/projects/projects.ts.
// Run with: npm run seed:body
import { writeFileSync } from "node:fs";
import { projects } from "../src/app/api/projects/projects.ts";

const outFile = new URL("../projects.body.json", import.meta.url);

writeFileSync(outFile, JSON.stringify(projects, null, 2) + "\n");
console.log(`Wrote ${projects.length} projects to projects.body.json`);

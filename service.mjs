// Service declaration of the app. The app's code imports it to read its
// database and its port, so the build copies it into the build output
// (dist/service.mjs), where the deployed server resolves it.
import node from "@prisma/composer/node";
import { compute } from "@prisma/composer-prisma-cloud";
import { postgres, dataContract } from "@prisma/composer-prisma-cloud/orm";
import ogadminProductosApiContractJson from "./src/prisma/contract.json" with { type: "json" };

export default compute({
  name: "api",
  deps: { db: postgres(dataContract(ogadminProductosApiContractJson)) },
  build: node({
    module: import.meta.url,
    dir: "dist",
    entry: "src/server.js",
    dependencies: "external",
  }),
});

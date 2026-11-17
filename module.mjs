import { module } from "@prisma/composer";
import { postgres, dataContract } from "@prisma/composer-prisma-cloud/orm";
import ogadminProductosApiContractJson from "./src/prisma/contract.json" with { type: "json" };
import ogadminProductosApiService from "./service.mjs";

export default module("zzz", ({ provision }) => {
  const database = provision(
    postgres({
      name: "database",
      contract: dataContract(ogadminProductosApiContractJson),
      config: "./prisma.config.ts",
    }),
  );
  provision(ogadminProductosApiService, { deps: { db: database } });
});

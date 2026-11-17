#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/81134c1171ddfe15398c09ddbf3bf6713256423c9e1a842bf180f292a0813b8b/contract';
import endContract from '../../snapshots/81134c1171ddfe15398c09ddbf3bf6713256423c9e1a842bf180f292a0813b8b/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'productos',
        columns: [
          col('categoria', 'character varying(100)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('nombre', 'character varying(100)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('pvp', 'numeric(10,2)', {
            notNull: true,
            codecRef: { codecId: 'pg/numeric@1', typeParams: { precision: 10, scale: 2 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);

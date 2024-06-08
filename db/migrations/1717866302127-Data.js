module.exports = class Data1717866302127 {
    name = 'Data1717866302127'

    async up(db) {
        await db.query(`CREATE TABLE "account_deployed" ("id" character varying NOT NULL, "network" text NOT NULL, "block" integer NOT NULL, "entry_point" text NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "user_op_hash" text NOT NULL, "sender" text NOT NULL, "factory" text NOT NULL, "paymaster" text NOT NULL, "tx_hash" text NOT NULL, CONSTRAINT "PK_a6c041f3e6f526dbeb7df3f40b3" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_1af9e9ee7c6b73426ba2d1a9aa" ON "account_deployed" ("network") `)
        await db.query(`CREATE INDEX "IDX_d7715399b16ee146c2ef7dbbcf" ON "account_deployed" ("block") `)
        await db.query(`CREATE INDEX "IDX_7bc9117af708ed22e73ae239b8" ON "account_deployed" ("entry_point") `)
        await db.query(`CREATE INDEX "IDX_dc4450e0cac04be8ec68c03362" ON "account_deployed" ("timestamp") `)
        await db.query(`CREATE INDEX "IDX_7b4e897f96b69492eda1cd44b5" ON "account_deployed" ("user_op_hash") `)
        await db.query(`CREATE INDEX "IDX_a0e42228061519dbd7de8a5d28" ON "account_deployed" ("sender") `)
        await db.query(`CREATE INDEX "IDX_29831a8329f62b8fb7fb637705" ON "account_deployed" ("tx_hash") `)
        await db.query(`CREATE TABLE "user_operation_event" ("id" character varying NOT NULL, "network" text NOT NULL, "block" integer NOT NULL, "entry_point" text NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "user_op_hash" text NOT NULL, "sender" text NOT NULL, "paymaster" text NOT NULL, "nonce" numeric NOT NULL, "success" boolean NOT NULL, "actual_gas_cost" numeric NOT NULL, "actual_gas_used" numeric NOT NULL, "tx_hash" text NOT NULL, CONSTRAINT "PK_b7bf279fa7c88a3cf2052e66ae8" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_1d3df391d2b0b85892642f90b3" ON "user_operation_event" ("network") `)
        await db.query(`CREATE INDEX "IDX_e22c6244a69b9655e033d5faa5" ON "user_operation_event" ("block") `)
        await db.query(`CREATE INDEX "IDX_6976b2d9e41088e33f28593f65" ON "user_operation_event" ("entry_point") `)
        await db.query(`CREATE INDEX "IDX_1ac64307ae4cb5183e2ce637e7" ON "user_operation_event" ("timestamp") `)
        await db.query(`CREATE INDEX "IDX_3cb30c44133ec64f5909e3a4fc" ON "user_operation_event" ("user_op_hash") `)
        await db.query(`CREATE INDEX "IDX_49b768c70f31a946af3da9b301" ON "user_operation_event" ("sender") `)
        await db.query(`CREATE INDEX "IDX_c163296c60560adfa0c8b91c71" ON "user_operation_event" ("paymaster") `)
        await db.query(`CREATE INDEX "IDX_3e36dc937d0abc1f6326aeceab" ON "user_operation_event" ("tx_hash") `)
    }

    async down(db) {
        await db.query(`DROP TABLE "account_deployed"`)
        await db.query(`DROP INDEX "public"."IDX_1af9e9ee7c6b73426ba2d1a9aa"`)
        await db.query(`DROP INDEX "public"."IDX_d7715399b16ee146c2ef7dbbcf"`)
        await db.query(`DROP INDEX "public"."IDX_7bc9117af708ed22e73ae239b8"`)
        await db.query(`DROP INDEX "public"."IDX_dc4450e0cac04be8ec68c03362"`)
        await db.query(`DROP INDEX "public"."IDX_7b4e897f96b69492eda1cd44b5"`)
        await db.query(`DROP INDEX "public"."IDX_a0e42228061519dbd7de8a5d28"`)
        await db.query(`DROP INDEX "public"."IDX_29831a8329f62b8fb7fb637705"`)
        await db.query(`DROP TABLE "user_operation_event"`)
        await db.query(`DROP INDEX "public"."IDX_1d3df391d2b0b85892642f90b3"`)
        await db.query(`DROP INDEX "public"."IDX_e22c6244a69b9655e033d5faa5"`)
        await db.query(`DROP INDEX "public"."IDX_6976b2d9e41088e33f28593f65"`)
        await db.query(`DROP INDEX "public"."IDX_1ac64307ae4cb5183e2ce637e7"`)
        await db.query(`DROP INDEX "public"."IDX_3cb30c44133ec64f5909e3a4fc"`)
        await db.query(`DROP INDEX "public"."IDX_49b768c70f31a946af3da9b301"`)
        await db.query(`DROP INDEX "public"."IDX_c163296c60560adfa0c8b91c71"`)
        await db.query(`DROP INDEX "public"."IDX_3e36dc937d0abc1f6326aeceab"`)
    }
}

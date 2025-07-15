import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserEntity1751652901215 implements MigrationInterface {
    name = 'CreateUserEntity1751652901215'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_d1206b00842f789e35c7c5baf6"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "insurance"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "bithday"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "UQ_d1206b00842f789e35c7c5baf61"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "rg"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "genero"`);
        await queryRunner.query(`DROP TYPE "public"."patient_genero_enum"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "UQ_2c56e61f9e1afb07f28882fcebb"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "created"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "updated"`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "updated" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "created" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "phone" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "email" character varying(150)`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "UQ_2c56e61f9e1afb07f28882fcebb" UNIQUE ("email")`);
        await queryRunner.query(`CREATE TYPE "public"."patient_genero_enum" AS ENUM('M', 'F', 'I', 'U')`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "genero" "public"."patient_genero_enum" NOT NULL DEFAULT 'U'`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "rg" character varying(20)`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "cpf" character varying(11)`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "UQ_d1206b00842f789e35c7c5baf61" UNIQUE ("cpf")`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "bithday" date`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "insurance" character varying(50)`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_d1206b00842f789e35c7c5baf6" ON "patient" ("cpf") `);
    }

}

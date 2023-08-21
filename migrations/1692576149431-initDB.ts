import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDB1692576149431 implements MigrationInterface {
    name = 'InitDB1692576149431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "FK_e3867e13698980b1af23d6fe8aa"`);
        await queryRunner.query(`ALTER TABLE "product_entity" DROP CONSTRAINT "FK_641188cadea80dfe98d4c769ebf"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "confirEmail"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "rolId"`);
        await queryRunner.query(`ALTER TABLE "product_entity" DROP COLUMN "createdDate"`);
        await queryRunner.query(`ALTER TABLE "product_entity" DROP COLUMN "updatedDate"`);
        await queryRunner.query(`ALTER TABLE "product_entity" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "confir_email" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "rol_id" uuid`);
        await queryRunner.query(`ALTER TABLE "product_entity" ADD "created_date" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product_entity" ADD "updated_date" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product_entity" ADD "category_id" uuid`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD CONSTRAINT "FK_fc41c06e95e4c3d4bae0b9806b3" FOREIGN KEY ("rol_id") REFERENCES "rol_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_entity" ADD CONSTRAINT "FK_8773e1f2f8d30d4c3dc5b7822e3" FOREIGN KEY ("category_id") REFERENCES "category_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_entity" DROP CONSTRAINT "FK_8773e1f2f8d30d4c3dc5b7822e3"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "FK_fc41c06e95e4c3d4bae0b9806b3"`);
        await queryRunner.query(`ALTER TABLE "product_entity" DROP COLUMN "category_id"`);
        await queryRunner.query(`ALTER TABLE "product_entity" DROP COLUMN "updated_date"`);
        await queryRunner.query(`ALTER TABLE "product_entity" DROP COLUMN "created_date"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "rol_id"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "confir_email"`);
        await queryRunner.query(`ALTER TABLE "product_entity" ADD "categoryId" uuid`);
        await queryRunner.query(`ALTER TABLE "product_entity" ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product_entity" ADD "createdDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "rolId" uuid`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "confirEmail" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "product_entity" ADD CONSTRAINT "FK_641188cadea80dfe98d4c769ebf" FOREIGN KEY ("categoryId") REFERENCES "category_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD CONSTRAINT "FK_e3867e13698980b1af23d6fe8aa" FOREIGN KEY ("rolId") REFERENCES "rol_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

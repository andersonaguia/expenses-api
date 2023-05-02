import { MigrationInterface, QueryRunner } from "typeorm";

export class CategoryModified1682776669159 implements MigrationInterface {
    name = 'CategoryModified1682776669159'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` DROP FOREIGN KEY \`FK_50cb8b278cde2b788bdef1d6fe0\``);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`modifiedById\` \`userId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`userId\` \`modifiedById\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`modifiedById\``);
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`userId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`modifiedById\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`system_users\` CHANGE \`updatedAt\` \`updatedAt\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`system_users\` CHANGE \`deletedAt\` \`deletedAt\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`system_users\` CHANGE \`updatedAt\` \`updatedAt\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`system_users\` CHANGE \`deletedAt\` \`deletedAt\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` ADD CONSTRAINT \`FK_32b856438dffdc269fa84434d9f\` FOREIGN KEY (\`userId\`) REFERENCES \`system_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`category\` ADD CONSTRAINT \`FK_50cb8b278cde2b788bdef1d6fe0\` FOREIGN KEY (\`modifiedById\`) REFERENCES \`system_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` DROP FOREIGN KEY \`FK_50cb8b278cde2b788bdef1d6fe0\``);
        await queryRunner.query(`ALTER TABLE \`category\` DROP FOREIGN KEY \`FK_32b856438dffdc269fa84434d9f\``);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`system_users\` CHANGE \`deletedAt\` \`deletedAt\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`system_users\` CHANGE \`updatedAt\` \`updatedAt\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`system_users\` CHANGE \`deletedAt\` \`deletedAt\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`system_users\` CHANGE \`updatedAt\` \`updatedAt\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`modifiedById\``);
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`modifiedById\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`modifiedById\` \`userId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`userId\` \`modifiedById\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` ADD CONSTRAINT \`FK_50cb8b278cde2b788bdef1d6fe0\` FOREIGN KEY (\`modifiedById\`) REFERENCES \`system_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

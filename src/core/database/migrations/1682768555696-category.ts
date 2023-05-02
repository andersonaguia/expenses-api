import { MigrationInterface, QueryRunner } from "typeorm";

export class Category1682768555696 implements MigrationInterface {
    name = 'Category1682768555696'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(250) NOT NULL, \`createdById\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`system_users\` CHANGE \`updatedAt\` \`updatedAt\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`system_users\` CHANGE \`deletedAt\` \`deletedAt\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`system_users\` CHANGE \`updatedAt\` \`updatedAt\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`system_users\` CHANGE \`deletedAt\` \`deletedAt\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` ADD CONSTRAINT \`FK_50c69cdc9b3e7494784a2fa2db4\` FOREIGN KEY (\`createdById\`) REFERENCES \`system_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` DROP FOREIGN KEY \`FK_50c69cdc9b3e7494784a2fa2db4\``);
        await queryRunner.query(`ALTER TABLE \`system_users\` CHANGE \`deletedAt\` \`deletedAt\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`system_users\` CHANGE \`updatedAt\` \`updatedAt\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`system_users\` CHANGE \`deletedAt\` \`deletedAt\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`system_users\` CHANGE \`updatedAt\` \`updatedAt\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP TABLE \`category\``);
    }

}

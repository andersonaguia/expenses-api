import { MigrationInterface, QueryRunner } from "typeorm";

export class EvolutionEntity1683054705801 implements MigrationInterface {
    name = 'EvolutionEntity1683054705801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_259a2bbc375e2fb8a50683a95a\` ON \`expense\``);
        await queryRunner.query(`CREATE TABLE \`evolution\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`currentMonthlyCash\` float NOT NULL, \`currentAnnualCash\` float NOT NULL, \`expenseId\` int NOT NULL, \`modifiedById\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`system_users\` CHANGE \`updatedAt\` \`updatedAt\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`system_users\` CHANGE \`deletedAt\` \`deletedAt\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`expense\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`system_users\` CHANGE \`updatedAt\` \`updatedAt\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`system_users\` CHANGE \`deletedAt\` \`deletedAt\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`expense\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`evolution\` ADD CONSTRAINT \`FK_34e357fe8de1f6dea1e09b0e1f8\` FOREIGN KEY (\`expenseId\`) REFERENCES \`expense\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`evolution\` ADD CONSTRAINT \`FK_8751a1955de352b65e05ddc34d4\` FOREIGN KEY (\`modifiedById\`) REFERENCES \`system_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`evolution\` DROP FOREIGN KEY \`FK_8751a1955de352b65e05ddc34d4\``);
        await queryRunner.query(`ALTER TABLE \`evolution\` DROP FOREIGN KEY \`FK_34e357fe8de1f6dea1e09b0e1f8\``);
        await queryRunner.query(`ALTER TABLE \`expense\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`system_users\` CHANGE \`deletedAt\` \`deletedAt\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`system_users\` CHANGE \`updatedAt\` \`updatedAt\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`expense\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`system_users\` CHANGE \`deletedAt\` \`deletedAt\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`system_users\` CHANGE \`updatedAt\` \`updatedAt\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP TABLE \`evolution\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_259a2bbc375e2fb8a50683a95a\` ON \`expense\` (\`comments\`)`);
    }

}

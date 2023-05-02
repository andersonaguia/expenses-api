import { MigrationInterface, QueryRunner } from "typeorm";

export class Expense1682781738896 implements MigrationInterface {
    name = 'Expense1682781738896'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`expense\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`currentYear\` int NOT NULL, \`name\` varchar(250) NOT NULL, \`comments\` varchar(250) NOT NULL, \`solarPercentage\` int NOT NULL, \`rivierePercentage\` int NOT NULL, \`monthlyExpense\` float NOT NULL, \`annualExpense\` float NOT NULL, \`solarMonthExpense\` float NOT NULL, \`riviereMonthExpense\` float NOT NULL, \`categoryId\` int NOT NULL, \`modifiedById\` int NOT NULL, UNIQUE INDEX \`IDX_4376292a4cd9cb1d3bbe56523a\` (\`name\`), UNIQUE INDEX \`IDX_259a2bbc375e2fb8a50683a95a\` (\`comments\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`system_users\` CHANGE \`updatedAt\` \`updatedAt\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`system_users\` CHANGE \`deletedAt\` \`deletedAt\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`system_users\` CHANGE \`updatedAt\` \`updatedAt\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`system_users\` CHANGE \`deletedAt\` \`deletedAt\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`expense\` ADD CONSTRAINT \`FK_42eea5debc63f4d1bf89881c10a\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`expense\` ADD CONSTRAINT \`FK_94c81dfc4d780f85a4f529dfe26\` FOREIGN KEY (\`modifiedById\`) REFERENCES \`system_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`expense\` DROP FOREIGN KEY \`FK_94c81dfc4d780f85a4f529dfe26\``);
        await queryRunner.query(`ALTER TABLE \`expense\` DROP FOREIGN KEY \`FK_42eea5debc63f4d1bf89881c10a\``);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`system_users\` CHANGE \`deletedAt\` \`deletedAt\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`system_users\` CHANGE \`updatedAt\` \`updatedAt\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`system_users\` CHANGE \`deletedAt\` \`deletedAt\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`system_users\` CHANGE \`updatedAt\` \`updatedAt\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP INDEX \`IDX_259a2bbc375e2fb8a50683a95a\` ON \`expense\``);
        await queryRunner.query(`DROP INDEX \`IDX_4376292a4cd9cb1d3bbe56523a\` ON \`expense\``);
        await queryRunner.query(`DROP TABLE \`expense\``);
    }

}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class SubcategoryEntity1683160390796 implements MigrationInterface {
  name = 'SubcategoryEntity1683160390796';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`subcategory\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(250) NOT NULL, \`modifiedById\` int NOT NULL, UNIQUE INDEX \`IDX_accfb3da1d9f29dbda6c7554b2\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`subcategory\` ADD CONSTRAINT \`FK_62cc6a96ee132741c1408d8978d\` FOREIGN KEY (\`modifiedById\`) REFERENCES \`system_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`subcategory\` DROP FOREIGN KEY \`FK_62cc6a96ee132741c1408d8978d\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_accfb3da1d9f29dbda6c7554b2\` ON \`subcategory\``,
    );
    await queryRunner.query(`DROP TABLE \`subcategory\``);
  }
}

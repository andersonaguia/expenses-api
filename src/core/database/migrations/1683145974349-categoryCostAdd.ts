import { MigrationInterface, QueryRunner } from 'typeorm';

export class CategoryCostAdd1683145974349 implements MigrationInterface {
  name = 'CategoryCostAdd1683145974349';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`category\` ADD \`monthlyCost\` float NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category\` ADD \`annualCost\` float NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category\` ADD UNIQUE INDEX \`IDX_23c05c292c439d77b0de816b50\` (\`name\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category\` ADD CONSTRAINT \`FK_50cb8b278cde2b788bdef1d6fe0\` FOREIGN KEY (\`modifiedById\`) REFERENCES \`system_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`category\` DROP INDEX \`IDX_23c05c292c439d77b0de816b50\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`category\` DROP COLUMN \`annualCost\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`category\` DROP COLUMN \`monthlyCost\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`category\` ADD CONSTRAINT \`FK_50c69cdc9b3e7494784a2fa2db4\` FOREIGN KEY (\`modifiedById\`) REFERENCES \`system_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}

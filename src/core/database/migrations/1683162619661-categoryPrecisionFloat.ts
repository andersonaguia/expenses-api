import { MigrationInterface, QueryRunner } from 'typeorm';

export class CategoryPrecisionFloat1683162619661 implements MigrationInterface {
  name = 'CategoryPrecisionFloat1683162619661';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`category\` CHANGE \`monthlyCost\` \`monthlyCost\` float(8,2) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category\` CHANGE \`annualCost\` \`annualCost\` float(8,2) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`category\` CHANGE \`annualCost\` \`annualCost\` float(12) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category\` CHANGE \`monthlyCost\` \`monthlyCost\` float(12) NOT NULL`,
    );
  }
}

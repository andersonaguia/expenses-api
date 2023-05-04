import { MigrationInterface, QueryRunner } from 'typeorm';

export class ExpensePrecisionFloat1683163714502 implements MigrationInterface {
  name = 'ExpensePrecisionFloat1683163714502';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`expense\` DROP COLUMN \`solarPercentage\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`expense\` DROP COLUMN \`rivierePercentage\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`expense\` DROP COLUMN \`solarMonthExpense\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`expense\` DROP COLUMN \`riviereMonthExpense\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`expense\` ADD \`residentialPercentage\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`expense\` ADD \`commercialPercentage\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`expense\` ADD \`residentialMonthExpense\` float(8,2) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`expense\` ADD \`commercialMonthExpense\` float(8,2) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`expense\` ADD \`subcategoryId\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`expense\` CHANGE \`monthlyExpense\` \`monthlyExpense\` float(8,2) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`expense\` CHANGE \`annualExpense\` \`annualExpense\` float(8,2) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`expense\` ADD CONSTRAINT \`FK_75ba4eb1e03e42105b051de5cb2\` FOREIGN KEY (\`subcategoryId\`) REFERENCES \`subcategory\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`expense\` DROP FOREIGN KEY \`FK_75ba4eb1e03e42105b051de5cb2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`expense\` CHANGE \`annualExpense\` \`annualExpense\` float(12) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`expense\` CHANGE \`monthlyExpense\` \`monthlyExpense\` float(12) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`expense\` CHANGE \`annualExpense\` \`annualExpense\` float(12) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`expense\` CHANGE \`monthlyExpense\` \`monthlyExpense\` float(12) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`expense\` DROP COLUMN \`subcategoryId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`expense\` DROP COLUMN \`commercialMonthExpense\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`expense\` DROP COLUMN \`residentialMonthExpense\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`expense\` DROP COLUMN \`commercialPercentage\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`expense\` DROP COLUMN \`residentialPercentage\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`expense\` ADD \`riviereMonthExpense\` float NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`expense\` ADD \`solarMonthExpense\` float NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`expense\` ADD \`rivierePercentage\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`expense\` ADD \`solarPercentage\` int NOT NULL`,
    );
  }
}

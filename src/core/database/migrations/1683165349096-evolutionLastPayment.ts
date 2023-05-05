import { MigrationInterface, QueryRunner } from 'typeorm';

export class EvolutionLastPayment1683165349096 implements MigrationInterface {
  name = 'EvolutionLastPayment1683165349096';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`evolution\` ADD \`lastPayment\` float(8,2) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`evolution\` CHANGE \`currentMonthlyCash\` \`currentMonthlyCash\` float(8,2) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`evolution\` CHANGE \`currentAnnualCash\` \`currentAnnualCash\` float(8,2) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`evolution\` CHANGE \`currentAnnualCash\` \`currentAnnualCash\` float(12) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`evolution\` CHANGE \`currentMonthlyCash\` \`currentMonthlyCash\` float(12) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`evolution\` DROP COLUMN \`lastPayment\``,
    );
  }
}

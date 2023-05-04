import { MigrationInterface, QueryRunner } from 'typeorm';

export class ExpenseSubcategoryNullable1683165973263
  implements MigrationInterface
{
  name = 'ExpenseSubcategoryNullable1683165973263';

  public async up(queryRunner: QueryRunner): Promise<void> {  
    await queryRunner.query(
      `ALTER TABLE \`expense\` DROP FOREIGN KEY \`FK_75ba4eb1e03e42105b051de5cb2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`expense\` CHANGE \`subcategoryId\` \`subcategoryId\` int NULL`,
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
      `ALTER TABLE \`expense\` CHANGE \`subcategoryId\` \`subcategoryId\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`expense\` ADD CONSTRAINT \`FK_75ba4eb1e03e42105b051de5cb2\` FOREIGN KEY (\`subcategoryId\`) REFERENCES \`subcategory\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}

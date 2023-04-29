import { MigrationInterface, QueryRunner } from "typeorm";

export class SystemUsers1682712856970 implements MigrationInterface {
    name = 'SystemUsers1682712856970'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`system_users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(150) NOT NULL, \`occupation\` varchar(255) NOT NULL, \`email\` varchar(50) NOT NULL, \`password\` varchar(255) NOT NULL, \`salt\` varchar(255) NOT NULL, \`role\` enum ('admin', 'sindico', 'gerente', 'supervisor', 'usuario') NOT NULL DEFAULT 'usuario', \`active\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime NOT NULL, \`updatedAt\` datetime NULL, \`deletedAt\` datetime NULL, UNIQUE INDEX \`IDX_73dff187ed765e8403bf5fc911\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_73dff187ed765e8403bf5fc911\` ON \`system_users\``);
        await queryRunner.query(`DROP TABLE \`system_users\``);
    }

}

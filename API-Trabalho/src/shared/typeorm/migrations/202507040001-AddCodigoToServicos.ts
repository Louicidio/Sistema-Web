import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddCodigoToServicos20250704 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "servicos",
            new TableColumn({
                name: "codigo",
                type: "int",
                isUnique: true,
                isGenerated: true,
                generationStrategy: "increment",
                isNullable: false,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("servicos", "codigo");
    }
}

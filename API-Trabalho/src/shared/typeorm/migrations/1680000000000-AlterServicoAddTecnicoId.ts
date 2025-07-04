import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableColumn,
    TableForeignKey,
} from "typeorm";

export class AlterServicoAddTecnicoId1680000000000
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "servicos",
            new TableColumn({
                name: "tecnico_id",
                type: "uuid",
                isNullable: false,
            })
        );
        await queryRunner.createForeignKey(
            "servicos",
            new TableForeignKey({
                columnNames: ["tecnico_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("servicos");
        const foreignKey = table?.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("tecnico_id") !== -1
        );
        if (foreignKey) {
            await queryRunner.dropForeignKey("servicos", foreignKey);
        }
        await queryRunner.dropColumn("servicos", "tecnico_id");
    }
}

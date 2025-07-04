import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from "typeorm";

export class CreateService1751602560199 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "servicos",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "descricao",
                        type: "varchar",
                    },
                    {
                        name: "valor",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                    },
                    {
                        name: "status",
                        type: "varchar",
                        default: "'pendente'",
                    },
                    {
                        name: "data_entrada",
                        type: "timestamp",
                    },
                    {
                        name: "data_saida",
                        type: "timestamp",
                        isNullable: true,
                    },
                    {
                        name: "tecnico_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
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
        await queryRunner.dropTable("servicos");
    }
}

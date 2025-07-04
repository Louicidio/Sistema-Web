import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1751599261991 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id", // obrigatorio 
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    { name: "username", type: "varchar", isUnique: true }, // nome de usuario sera diferente do nome da pessoa
                    { name: "name", type: "varchar" }, 
                    { name: "email", type: "varchar", isUnique: true },
                    { name: "password", type: "varchar" },
                    { name: "funcao", type: "varchar", isNullable: true, isUnique: false }, 
                    { name: "created_at", type: "timestamp", default: "now()" }, // obrigatorio
                    { name: "updated_at", type: "timestamp", default: "now()" }, // obrigatorio
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }
}

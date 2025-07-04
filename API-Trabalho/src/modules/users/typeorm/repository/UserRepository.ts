import { EntityRepository, Repository } from "typeorm";
import User from "../entities/User";

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
    public async findByUsername(username: string): Promise<User | undefined> {
        const user = await this.findOne({ where: { username } });
        return user;
    }
    public async findById(id: string): Promise<User | undefined> {
        const user = await this.findOne({ where: { id } });
        return user;
    }
    public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.createQueryBuilder("user")
        .addSelect("user.password")
        .where("user.email = :email", { email })
        .getOne();
    return user;
    }
}

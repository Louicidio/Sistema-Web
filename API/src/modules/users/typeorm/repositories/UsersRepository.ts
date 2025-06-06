import { EntityRepository, Repository } from "typeorm";
import User from "../entities/User";
@EntityRepository(User)
export default class UserRepository extends Repository<User> {
    public async findByName(name: string): Promise<User | undefined> {
        const user = await this.findOne({ where: { name } });
        return user;
    }
    public async findByiD(id: string): Promise<User | undefined> {
        const user = await this.findOne({ where: { id } });
        return user;
    }
    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.findOne({ where: { email } });
        return user;
    }
}

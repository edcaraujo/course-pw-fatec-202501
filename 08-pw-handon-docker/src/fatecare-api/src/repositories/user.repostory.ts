import { AppDataSource } from "../data-source";
import { User }  from "../models/user.model";

const repository = AppDataSource.getRepository(User);

async function addUser(username: string, password: string) : Promise<User> {
    const user = repository.create({
        "username": username,
        "password": password
    });
    
    return await repository.save(user);
}

export default {
    addUser
}
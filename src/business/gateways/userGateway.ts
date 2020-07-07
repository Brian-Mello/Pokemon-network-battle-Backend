import { User } from "../entites/user";

export interface UserGateway {
    signup(user: User): Promise<void>;
    signin(email: string, nickname: string): Promise<User | undefined>;
    getUserByEmail(email: string): Promise<User | undefined>;
    getUserByNickname(nickname: string): Promise<User | undefined>;
    getUserById(id: string): Promise<User | undefined>;
    updatePassword(id: string, password: string): Promise<void>;
}
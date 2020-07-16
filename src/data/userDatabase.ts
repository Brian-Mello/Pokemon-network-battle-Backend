import { BaseDB } from "./baseDatabase";
import { UserGateway } from "../business/gateways/userGateway";
import { User } from "../business/entites/user";

export class UserDB extends BaseDB implements UserGateway{
    private userTableName = "user"

    private mapUserToDB(input?: any): User | undefined {
        return(
            input &&
            new User(
                input.id,
                input.name,
                input.nickname,
                input.gender,
                input.photo,
                input.email,
                input.password
            )
        )
    }

    public async signup(user: User): Promise<void> {
        await this.connection.raw(`
            INSERT INTO ${this.userTableName} (id, name, nickname, gender, photo, email, password)
            VALUES (
                '${user.getId()}',
                '${user.getName()}',
                '${user.getNickname()}',
                '${user.getGender()}',
                '${user.getPhoto()}',
                '${user.getEmail()}',
                '${user.getPassword()}'
            );
        `);
    };

    public async signin(emailOrnickname: string): Promise <User | undefined> {
        const user = await this.connection.raw(`
            SELECT *
            FROM ${this.userTableName}
            WHERE email = '${emailOrnickname}' OR nickname = '${emailOrnickname}' ;
        `);

        if(!user[0][0]){
            return undefined;
        };

        return this.mapUserToDB(user[0][0])
    };

    public async getUserByNicknameOrId(nicknameOrId: string): Promise <User | undefined> {
        const user = await this.connection.raw(`
            SELECT *
            FROM ${this.userTableName}
            WHERE nickname = '${nicknameOrId}' OR id = '${nicknameOrId}' ;
        `);

        if(!user[0][0]){
            return undefined;
        };

        return this.mapUserToDB(user[0][0])
    };

    public async getUserById(id: string): Promise<User | undefined> {
        const user = await this.connection.raw(`
            SELECT *
            FROM ${this.userTableName}
            WHERE id = '${id}' ;
        `);

        if(!user[0][0]){
            return undefined;
        };

        return this.mapUserToDB(user[0][0])
    }

    public async getUserByNickname(nickname: string): Promise <User | undefined> {
        const user = await this.connection.raw(`
            SELECT *
            FROM ${this.userTableName}
            WHERE nickname = '${nickname}' ;
        `);

        if(!user[0][0]){
            return undefined;
        };

        return this.mapUserToDB(user[0][0])
    };

    public async getUserByEmail(email: string): Promise <User | undefined> {
        const user = await this.connection.raw(`
            SELECT *
            FROM ${this.userTableName}
            WHERE email = '${email}' ;
        `);

        if(!user[0][0]){
            return undefined;
        };

        return this.mapUserToDB(user[0][0])
    };

    public async updatePassword(id: string, password: string): Promise<void>{
        await this.connection.raw(`
            UPDATE ${this.userTableName}
            SET password = '${password}'
            WHERE id = '${id}'
        `)
    }

    public async updatePhoto(id: string, photo: string): Promise<void>{
        await this.connection.raw(`
            UPDATE ${this.userTableName}
            SET photo = '${photo}'
            WHERE id = '${id}'
        `)
    }

    public async updateNickname(id: string, nickname: string): Promise<void>{
        await this.connection.raw(`
            UPDATE ${this.userTableName}
            SET nickname = '${nickname}'
            WHERE id = '${id}'
        `)
    }
}
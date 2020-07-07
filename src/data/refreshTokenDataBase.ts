import { BaseDB } from "./baseDatabase";

export class RefreshTokenDB extends BaseDB implements RefreshTokenGateway{

    private refreshTokenTableName = "refreshToken";

    public async createRefreshToken(input: RefreshToken): Promise<void>{
        await this.connection.raw(`
            INSERT INTO ${this.refreshTokenTableName}(token, userId)
            VALUES('${input.token}', '${input.userId}');
        `);
    }

    public async deleteRefreshToken(userId: string): Promise<void>{
        await this.connection.raw(`
            DELETE FROM ${this.refreshTokenTableName}
            WHERE userId = '${userId}';
        `);
    };

    public async getRefreshToken(userId: string): Promise<RefreshToken | undefined>{
        const result = await this.connection.raw(`
            SELECT * 
            FROM ${this.refreshTokenTableName}
            WHERE userId = '${userId}';
        `);

        if(!result[0][0]){
            return undefined;
        };

        return result[0][0] && {
            token: result[0][0].token,
            userId: result[0][0].userId
        };
    };

}
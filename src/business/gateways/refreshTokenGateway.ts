interface RefreshTokenGateway{
    createRefreshToken(input: RefreshToken): Promise<void>;
    getRefreshToken(userId: string): Promise<RefreshToken | undefined>;
    deleteRefreshToken(userId: string): Promise<void>;
}

interface RefreshToken{
    token: string;
    userId: string;
}
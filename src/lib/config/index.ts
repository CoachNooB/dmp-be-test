export class Config {
    public port = process.env.NODE_PORT || "3000";
    public mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017";
    public jwtSecret = process.env.JWT_SECRET || "80652e45-73a8-4ab0-a1ac-deb95e60309b";
    public jobsEndPoint = process.env.JOBS_END_POINT || "http://dev3.dansmultipro.co.id/api/recruitment/positions.json";
    public jobsByIdEndPoint = process.env.JOBS_ID_END_POINT || "http://dev3.dansmultipro.co.id/api/recruitment/positions";
}
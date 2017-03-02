module.exports = {
    
    port: process.env.PORT,
    host: process.env.HOST || process.env.IP,
    origin: process.env.ORIGIN,
    repo: {
        root: process.env.FILE_REPO_ROOT || __dirname + "/data"
    }
    
};

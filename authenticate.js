
async function isAuthenticate(req, res, next) {
    try {
        res.send('success');
        next();
    } catch (error) {
        res.send().json(error);
    }


}
module.exports = isAuthenticate;
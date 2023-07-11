export async function userExists(req, res, next) {
    const { email } = req.body;

    try {
        const user = await db.collection('users').findOne({ email });
        if(user) return res.sendStatus(409);

        next();
    } catch (error) {
        return res.sendStatus(500);
    }
}

export async function checkUser(req, res, next) {
    const { email } = req.body;

    try {
        const user = await db.collection('users').findOne({ email });
        if(!user) return res.sendStatus(404);

        next();
    } catch {
        return res.sendStatus(500);
    }
}    

export async function checkToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if(!token) return res.sendStatus(401);

    next();
}
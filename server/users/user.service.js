const bcrypt = require('bcryptjs');
const db = require('../helpers/db');
const generateAccessToken = require('../helpers/generateAccessToken');

module.exports = {
    authenticate,
    create,
};

async function authenticate({ email, password }) {
    const user = await db.User.scope('withHash').findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.hash)))
        throw 'Email or password is incorrect';

    // authentication successful
    const token = await generateAccessToken({ user_id: user.id });

    return { ...omitHash(user.get()), token };
}

async function create(params) {
    if (await db.User.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already taken';
    }

    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }
    
    await db.User.create(params);
}

function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}
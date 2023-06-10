const accessTokenAttr = {
    maxAge: process.env.ACCESS_MAX_AGE,
    httpOnly: true,
    secure: process.env.SECURE,
    domain: process.env.DOMAIN,
}

const refreshTokenAttr = {
    maxAge: process.env.REFRESH_MAX_AGE,
    httpOnly: true,
    secure: process.env.SECURE,
    domain: process.env.DOMAIN,
    path: "/authentication"
}

const redirectAttr = {
    maxAge: process.env.MAX_AGE,
    httpOnly: true,
    secure: process.env.SECURE,
    domain: process.env.DOMAIN,
    path: "/authentication"
}

const rememberTokenAttr = {
    maxAge: process.env.REMEMBER_MAX_AGE,
    httpOnly: true,
    secure: process.env.SECURE,
    domain: process.env.DOMAIN,
}

const otherTokenAttr = {
    maxAge: process.env.MAX_AGE,
    httpOnly: true,
    secure: process.env.SECURE,
    domain: process.env.DOMAIN,
}

module.exports = {
    accessTokenAttr,
    refreshTokenAttr,
    redirectAttr,
    rememberTokenAttr,
    otherTokenAttr,
}
const zod = require("zod");

const UserSignup = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})

const UserSignin = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

const UserUpdate = zod.object({
    firstName: zod.optional(zod.string()),
    lastName: zod.string().optional(), //muuch beter
    password: zod.optional(zod.string())
})

module.exports = {
    UserSignup: UserSignup,
    UserSignin: UserSignin,
    UserUpdate: UserUpdate
}

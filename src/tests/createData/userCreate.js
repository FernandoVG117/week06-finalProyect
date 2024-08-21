const User = require('../../models/User');

const userCreate = async () => {
    const user = {
        firstName: "Tester",
        lastName: "Tester",
        email: "test@email.com",
        password: "user1234",
        phone: "1234567890"
    }
    await User.create(user)
}

module.exports = userCreate;
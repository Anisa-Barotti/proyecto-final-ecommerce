const User = require('../models/User')
const sequelize = require('../utils/connection');
require('../models/User');
require('../models/Category');
require('../models/Product');
require('../models');

const main = async() => {
    try{
        await sequelize.sync({ force: true });
        
        await User.create({
            firstName:"testUser",
            lastName: "testUser",
            email: "testUser@gmail.com",
            password: "testUser12345",
            phone: "123456789",
        })

        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();
import Sequelize from "sequelize";
import Users from "./Models/User.js"
import Content from "./Models/Content.js"


const db = {};
db.Sequelize = new Sequelize("postgres", "postgres", "postgres", {
	host: "localhost",
	port: "5438",
	dialect: "postgres",
	logging: false,
});

db.Users = Users(db.Sequelize);
db.Content = Content(db.Sequelize)

db.Content.belongsTo(db.Users, {
	foreignKey: "creator",
});

// db.Sequelize.sync({
// 	force: true,
// })

export default db;
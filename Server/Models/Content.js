import Sequelize from "sequelize";

export default (sq) => {
	return sq.define(
		"content",
		{
			name: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			type: {
				type: Sequelize.ENUM(['text', 'audio', "video"]),
				allowNull: false,
				unique: false,
			},
			price: {
				type: Sequelize.INTEGER,
				allowNull: false,
				unique: false,
			},
			data: {
				type: Sequelize.TEXT,
				allowNull: false,
				unique: false,
			},
			anonymus: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				unique: false,
			},
			account: {
				type: Sequelize.STRING,
				allowNull: true,
				unique: false,
			},
		},
		{ freezeTableName: true }
	);
};

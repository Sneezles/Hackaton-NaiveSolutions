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
				type: Sequelize.STRING,
				allowNull: false,
				unique: false,
			},
		},
		{ freezeTableName: true }
	);
};

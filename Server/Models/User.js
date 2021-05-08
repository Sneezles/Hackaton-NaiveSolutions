import Sequelize from "sequelize";

export default (sq) => {
	return sq.define(
		"users",
		{
			name: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			walletToken: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			walletKey: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
		},
		{ freezeTableName: true }
	);
};

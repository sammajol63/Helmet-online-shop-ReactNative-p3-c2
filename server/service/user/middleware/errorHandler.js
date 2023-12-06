function errorHandler(err, req, res, next) {
	let message = "Internal server error";
	let status = 500;

	switch (err.name) {
		case "Name is required":
		case "Email is required":
		case "Password is required":
		case "Name is required":
			message = err.name;
			status = 400;
			break;
		case "SequelizeValidationError":
			message = "Invalid email format";
			status = 400;
			break;
		case "SequelizeForeignKeyConstraintError":
			(status = 400), (message = "Food not found");
			break;
		case "SequelizeUniqueConstraintError":
			message = "Email must be unique";
			status = 400;
			break;
		case "Invalid email/password":
			message = err.name;
			status = 401;
			break;
		case "Invalid token":
			message = err.name;
			status = 401;
			break;
		case "JsonWebTokenError":
			message = "Invalid token";
			status = 401;
			break;
		case "You are not authorized":
			message = err.name;
			status = 403;
			break;
		case "Hero not found":
			message = err.name;
			status = 404;
			break;
	}

	res.status(status).json({ message });
}

module.exports = errorHandler;
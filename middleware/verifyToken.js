import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
	const token = req.headers["x-access-token"];
	console.log(req.headers)
	if (!token) {
		return res.status(401).send({ message: "Token not provided" });
	}

	jwt.verify(token, "top-secret", (err, decoded) => {
		if (err) {
			return res.status(401).send({ message: "User not authorized" });
		}
		req.userId = decoded.id;
		next();
	});
};

export default verifyToken;

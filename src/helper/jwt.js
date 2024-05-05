import jwt from 'jsonwebtoken';
import 'dotenv/config'
const salt = process.env.JWT_SALT
function generate_token( payload ) {
	return jwt.sign( payload, salt )
}

function verify_token( token ) {
	return jwt.verify( token, salt )
}

export { generate_token, verify_token }

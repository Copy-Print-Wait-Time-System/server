const bcrypt = require('bcrypt');
const saltRounds = 10;

export function encrypt(password: string, color: boolean) : string {

 return bcrypt.hash(password, saltRounds);

}

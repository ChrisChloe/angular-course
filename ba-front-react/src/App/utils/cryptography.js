import bcrypt from 'bcryptjs';

export const generateHash = text => {
    return bcrypt.hashSync(JSON.stringify(text), 10)
};
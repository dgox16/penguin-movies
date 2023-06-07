import bcrypt from "bcrypt";

export const encryptPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

export const comparePassword = async (passwordInDB, password) => {
    return await bcrypt.compare(password, passwordInDB);
};

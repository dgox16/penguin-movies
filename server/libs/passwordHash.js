import bcrypt from "bcrypt";

export const encryptPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

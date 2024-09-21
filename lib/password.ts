import bcrypt from "bcryptjs";

// Hash the password before storing
export async function saltAndHashPassword(password:string) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

// Verify the provided password with the stored hashed password
export async function verifyPassword(password:string, hashedPassword:string) {
    return await bcrypt.compare(password, hashedPassword);
}

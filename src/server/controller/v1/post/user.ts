import { Request, Response } from "express";
import { genSaltSync, hashSync } from "bcryptjs";
import { User } from "../../../../models";
import { generateToken } from "../../../../middleware";


export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;

    // Handle Empty
    if(!name) {
        res.status(400);
        res.json({
            message: "Name Cannot be Empty."
        });
        return;
    }
    if(!email) {
        res.status(400);
        res.json({
            message: "Email Cannot be Empty."
        });
        return;
    }
    if(!password) {
        res.status(400);
        res.json({
            message: "Password Cannot be Empty."
        });
        return;
    }
    if(!role) {
        res.status(400);
        res.json({
            message: "Role Cannot be Empty."
        });
        return;
    }

    // Validate Email
    const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if(!emailPattern.test(email)) {
        res.status(400);
        res.json({
            message: "Invalid Email."
        });
        return;
    }

    // Validate Role
    const validRoles: string[] = ["Admin", "User"];
    if(!validRoles.includes(role)) {
        res.status(400);
        res.json({
            message: "Invalid Role. Choose between Admin or User"
        });
        return;
    }

    // Check Existing Email
    const exist = await User.findOne({ email });
    if(exist) {
        res.status(400);
        res.json({
            message: "Email Already Exist, Please use another Email address."
        });
        return;
    }

    // Hash Password
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);

    // Insert to DB
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role
    });

    if(newUser) {
        res.status(201);
        res.json({
            message: "User Created",
            data: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                token: generateToken({ id: newUser.id, role })
            }
        });
    } else {
        res.status(400);
        throw new Error('Failed to Register User');
    }

}
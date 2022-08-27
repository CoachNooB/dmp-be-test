import { Request, Response } from "express";
import { User } from "../../../../models";
import { compareSync } from "bcryptjs";
import { generateToken } from "../../../../middleware";

export const loginHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Empty Check
    if(!email) {
        res.status(400);
        res.json({
            message: "Email cannot be empty."
        });
        return;
    }
    if(!password) {
        res.status(400);
        res.json({
            message: "Password cannot be empty."
        });
        return;
    }

    const user = await User.findOne({ email });
    if(!user) {
        res.status(400);
        res.json({
            message: `Email ${email} Not Registered.`
        });
        return;
    }

    // Compare Password
    if(!compareSync(password, user.password)) {
        res.status(400);
        res.json({
            message: "Invalid Password."
        });
        return;
    }

    res.status(200);
    res.send({
        message: "Log In Success.",
        token: generateToken({ id: user.id, role: user.role })
    });
};

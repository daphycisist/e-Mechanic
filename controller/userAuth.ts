import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import sql from "../utilities/pg-config";
import { validateLoginInput, validateSignupInput } from "../validations/validations";

import dotenv from "dotenv";


dotenv.config();
const secret = process.env.ACCESS_TOKEN_SECRET as string;

export const login = {};
export const signup = {};
export const refresh = {};

class UserAuthentication {
  //   static async isValid(req: Request, res: Response) {
  //     const { email, password } = req.body;
  //     const result = await signupSchema.validateAsync(req.body, {
  //       abortEarly: false,
  //     });
  //   }



  static async verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = await req.body;
      if (!authorization) {
        return res.status(403).send({
          message: "You are not logged it",
        });
      }

      const token = authorization.split(" ")[1];
      req.token = token;

      const decoded = jwt.verify(token, secret);
      req.userData = decoded;
      next();
    } catch (err) {
      return next(err);
    }
  }

  static login(req: Request, res: Response) {
    const validData = validateLoginInput(req.body);
    const { email, password } = validData;
    const user = {
      email,
      password,
    };
    jwt.sign({ user }, "secretkey", (err: any, token: any) => {
      res.json({
        token,
      });
    });
  }

    static async signup(req: Request, res: Response, next: NextFunction) {
        try {
            
            const validUserInput = validateSignupInput(req.body);
            console.log(req.body);

        const {
        //   firstname,
        //   lastname, 
          email,
          phoneNumber,
          password,
        } = validUserInput;

        const userExists = await sql`SELECT * FROM users WHERE email = ${email}`
        

        if (userExists[0]) {
          throw new Error("User already exists");
        } else {
          const user = await sql`INSERT into users (email, phone, password) 
             VALUES(${email}, ${phoneNumber}, ${password}) RETURNING *`
          
          return res.status(201).send(user);
        }
    } catch (error) {
        return res.status(401).send(error.message)
    }
    // next()
    
  }
}

export { UserAuthentication };

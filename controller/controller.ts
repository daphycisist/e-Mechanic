import { NextFunction, Request, Response } from "express";
import { validateLoginInput, validateSignupInput } from "../validations/validations";

import jwt from "jsonwebtoken";
import sql from "../utilities/pg-config";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.ACCESS_TOKEN_SECRET as string;

class Controller {
  static async login(req: Request, res: Response) {
    try {
      const validData = validateLoginInput(req.body);
      const { email, password } = validData;

      const userExists = await sql`SELECT * FROM users WHERE email = ${email}`;

      if (!userExists[0]) {
        throw new Error("User does not exists");
      }

      const hashPassword = userExists[0]['password']
      const validPass = bcrypt.compare(password, hashPassword)
      if (!validPass) {
        res.status(400).send('Incorrect email or password')
      }
      
      const id = userExists[0].id

      jwt.sign({ id: id }, secret, (err: any, token: any) => {
        if (err) {
          throw new Error(err.message[0]);
        }
        res.header('auth-token', token).send(token)
      });

    } catch (error) {
      res.status(401).send(error)
    }
  }

  static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const validUserInput = validateSignupInput(req.body);

      const {
        firstname,
        lastname,
        email,
        phoneNumber,
        password,
      } = validUserInput;

      const userExists = await sql`SELECT * FROM users WHERE email = ${email}`;

      if (userExists[0]) {
        throw new Error("User already exists");
      }

      const saltRounds = 10;
      bcrypt.hash(password, saltRounds, async (err, hash) => {

        if (err) {
          return res.status(401).send("Authentication Failure");
        }
        
        const user = await sql`INSERT into users ( firstname, lastname, email, phonenumber, password) VALUES(${firstname}, ${lastname}, ${email}, ${phoneNumber}, ${hash}) RETURNING *`;
        res.status(201).send(user);
      });

    } catch (error) {
      return res.status(401).send(error.message);
    }
  }
}

export { Controller };

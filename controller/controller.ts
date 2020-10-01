import { NextFunction, Request, Response } from "express";
import { validateLoginInput, validateSignupInput } from "../validations/validations";
import {serviceSchema} from "../schema/joiSchemas";

import jwt from "jsonwebtoken";
import sql from "../utilities/pg-config";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import Joi from "joi";

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
      const validPass = await bcrypt.compare(password, hashPassword)
      if (!validPass) {
        res.status(400).send("Incorrect email or password");
      }

      const id = userExists[0].id;

      jwt.sign({ id: id }, secret, (err: any, token: any) => {
        if (err) {
          throw new Error(err.message[0]);
        }
        res.header("auth-token", token).send(token);
      });
    } catch (error) {
      res.status(401).send(error);
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
  static async createService(service: Record<string, unknown>) {
    const { error, value } = serviceSchema.tailor("create").validate(service);

    if (error) throw new Error(`Invalid Data Format ${error}`);

    try {
      return {
        message: "Service was succesfully created",
        status: 200,
        payload: await sql`INSERT INTO services ${sql(value)} RETURNING *`,
      };
    } catch (error) {
      return {
        message: "service Creation failed",
        status: 400,
        payload: error,
      };
    }
  }

  static async services() {
    try {
      return {
        message: "Services Suucessfully returned",
        status: 200,
        payload: await sql`SELECT * FROM services`,
      };
    } catch (error) {
      return {
        message: "Problem Trying to Fetch Services",
        status: 400,
        payload: error,
      };
    }
  }

  static async updateService(id: string, data: Record<string, unknown>) {
    const { error: invalidUUiD, value: UUID } = Joi.string()
      .uuid({ version: "uuidv4" })
      .validate(id);

    const { error, value } = serviceSchema.tailor("update").validate(data);

    if (invalidUUiD) throw Error("Please Provide a valid id");

    if (error) throw error;

    try {
      const update = await sql`UPDATE services SET ${sql(
        value
      )} WHERE id = ${UUID} RETURNING *`;

      return {
        message: "Service Updated successfully",
        status: 200,
        payload: update,
      };
    } catch (error) {
      return {
        message: "unable to update service",
        status: 400,
        paylaod: error,
      };
    }
  }

  static async deleteService(id: string) {
    try {
      const deleteItem = await sql`DELETE FROM services WHERE id =${id} RETURNING *`;
      return {
        message: "Service deleted successfully",
        status: 200,
        paylaod: deleteItem,
      };
    } catch (error) {
      return {
        message: "Error while trying to delete Service",
        status: 400,
        paylaod: error,
      };
    }
  }
}

export default  Controller;





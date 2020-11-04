import Joi from "joi";
import { loginSchema, signupSchema, mechanicSchema, requestSchema } from "../schema/joiSchemas";

const validateLoginInput = (userInput: object) => {
  const { error, value } = loginSchema.validate(userInput);
  if (error) throw new Error(error.details[0].message);
  return value;
};

const validateSignupInput = (userInput: object) => {
  const { error, value } = signupSchema.validate(userInput);
  if (error) throw new Error(error.details[0].message)
  return value;
};

const validateMechanicInput = (mechanicInput: object) => {
  const { error, value } = mechanicSchema.validate(mechanicInput);
  if (error) throw new Error(error.details[0].message)
  return value;
};

const validateRequestInput = (requestInput: object) => {
  const { error, value } = requestSchema.validate(requestInput);
  if (error) throw new Error(error.details[0].message)
  return value;
};

const validateUUIDInput = (id: string) => {
  let validity =  Joi.string()
    .uuid({ version: "uuidv4" })
    .validate(id);
  return validity;
};

export { validateLoginInput, validateSignupInput, validateMechanicInput, validateRequestInput, validateUUIDInput };


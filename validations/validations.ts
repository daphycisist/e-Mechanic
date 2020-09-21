import { loginSchema, signupSchema } from "../schema/joiSchemas";

const validateLoginInput = (userInput: object) => {
  const { error, value } = loginSchema.validate(userInput);
  if (error) throw new Error("invalid input" + error);
  return value;
};

const validateSignupInput = (userInput: object) => {
  const { error, value } = signupSchema.validate(userInput);
  if (error) throw new Error("invalid input xxxx  " + error);
  return value;
};

export { validateLoginInput, validateSignupInput };

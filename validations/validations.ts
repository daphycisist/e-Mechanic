import { loginSchema, signupSchema } from "../schema/joiSchemas";

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

export { validateLoginInput, validateSignupInput };


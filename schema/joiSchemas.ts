import Joi from 'joi';

const signupSchema = Joi.object().keys({
  // firstname: Joi.string().lowercase().trim().required,
  // lastname: Joi.string().lowercase().trim().required,
  email: Joi.string().email().min(8).max(100).lowercase().trim().required(),
  phoneNumber: Joi.number().required(),
  password: Joi.string().min(7).alphanum().required(),
  // confirmPassword: Joi.valid(Joi.ref('password')).required
}); 

const loginSchema = Joi.object().keys({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(7).alphanum().required(),
});

export { loginSchema, signupSchema };

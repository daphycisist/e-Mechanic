import Joi from "joi";

const signupSchema = Joi.object().keys({
  firstname: Joi.string()
    .lowercase()
    .trim()
    .required(),
  lastname: Joi.string()
    .lowercase()
    .trim()
    .required(),
  email: Joi.string()
    .email()
    .min(8)
    .max(100)
    .lowercase().trim().required(),
  phoneNumber: Joi.string()
    .regex(/^\d{3}-\d{3}-\d{4}$/)
    .required(),
  password: Joi.string()
    .min(7)
    .alphanum()
    .required(),
  confirmPassword: Joi.valid(Joi.ref("password"))
    .required(),
});


const loginSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .lowercase()
    .required(),
  password: Joi.string()
    .min(7)
    .alphanum()
    .required(),
});


const serviceSchema = Joi.object({
  title: Joi.string()
    .min(5)
    .alter({
      create: (schema) => schema.required(),
      update: (schema) => schema.optional(),
    }),
  description: Joi.string()
    .min(20)
    .max(300)
    .alter({
      create: (schema) => schema.required(),
      update: (schema) => schema.optional(),
    }),
  price: Joi.number()
    .integer()
    .alter({
      create: (schema) => schema.required(),
      update: (schema) => schema.optional(),
    }),
});


const mechanicSchema = Joi.object().keys({
  id: Joi.string()
    .guid({version: 'uuidv4'})
    .alter({
      create: (schema) => schema.optional(),
      update: (schema) => schema.optional(),
    }),
  name: Joi.string()
    .lowercase()
    .trim()
    .alter({
      create: (schema) => schema.required(),
      update: (schema) => schema.optional(),
    }),
  address: Joi.string()
    .lowercase()
    .trim()
    .alter({
      create: (schema) => schema.required(),
      update: (schema) => schema.optional(),
    }),
  phonenumber: Joi.string()
    .regex(/^[0]\d{10}$/)
    .alter({
      create: (schema) => schema.required(),
      update: (schema) => schema.optional(),
    }),
});

const requestSchema = Joi.object().keys({
  id: Joi.string()
    .guid({version: 'uuidv4'})
    .alter({
      create: (schema) => schema.optional(),
      update: (schema) => schema.optional(),
    }),
  servicetype: Joi.string()
    .lowercase()
    .trim()
    .alter({
      create: (schema) => schema.required(),
      update: (schema) => schema.optional(),
    }),
  description: Joi.string()
    .lowercase()
    .trim()
    .alter({
      create: (schema) => schema.required(),
      update: (schema) => schema.optional(),
    }),
  requestedservice: Joi.string()
    .lowercase()
    .trim()
    .alter({
      create: (schema) => schema.required(),
      update: (schema) => schema.optional(),
    }),
  serviceaddress: Joi.string()
    .lowercase()
    .trim()
    .alter({
      create: (schema) => schema.required(),
      update: (schema) => schema.optional(),
    })
});

export { loginSchema, signupSchema, serviceSchema, mechanicSchema, requestSchema };

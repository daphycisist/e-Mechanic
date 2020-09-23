import Joi from "joi";
import sql from "../utilities/pg-config";

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

class Controller {
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
      .uuid({version: "uuidv4"}).validate(id);

    const { error, value } = serviceSchema.tailor("update").validate(data);

    if (invalidUUiD) throw Error("Please Provide a valid id");

    if (error) throw error;

    try {
        const update = await sql`UPDATE services SET ${sql(value)} WHERE id = ${UUID} RETURNING *`;
        
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
                message: 'Service deleted successfully',
                status: 200,
                paylaod: deleteItem
            }
        } catch (error) {
             return {
               message: "Error while trying to delete Service",
               status: 400,
               paylaod: error,
             };
        }
    }
    
   
    


    
}

export default Controller;

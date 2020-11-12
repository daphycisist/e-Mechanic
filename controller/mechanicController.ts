import { Request, Response } from "express";
import { validateMechanicInput } from "../validations/validations";
import sql from "../utilities/pg-config";
import Joi from "joi";
import { mechanicSchema } from "../schema/joiSchemas";
class Mechanic {
    static async getAllMechanics(req: Request, res: Response) {
        try {
            const allMechanics = await sql`SELECT * FROM mechanics`;
            
            res.status(200).json({
                message: "Mechanics data successfully returned",
                payload: allMechanics
            })
        } catch (error) {
            res.status(400).json({
                message: "Error fetching Mechanics data",
                payload: error.message
            });
        }
    }

    static async getMechanic(req: Request, res: Response) {
        try {
            const id = req.params.id
            const mechanic = await sql`SELECT * FROM mechanics WHERE id=${id}`;
            
            res.status(200).json({
                message: "Mechanic data successfully returned",
                payload: mechanic
            })
        } catch (error) {
            res.status(400).json({
                message: "Error fetching Mechanic data",
                payload: error.message
            });
        }
    }

    static async createMechanic(req: Request, res: Response) {
        try {
            const ValidMechanicData = validateMechanicInput(req.body);
            const { name, address, phonenumber } = ValidMechanicData;
            const userExists = await sql`SELECT * FROM mechanics WHERE phonenumber = ${phonenumber}`;

            if (userExists[0]) {
                throw new Error("User already exists");
            }

            const user = await sql`INSERT into mechanics ( name, address, phonenumber ) VALUES(${name}, ${address}, ${phonenumber} ) RETURNING *`;
            res.status(201).send(user)
        } catch (error) {
            res.status(401).send(error.message);
        }
    }


    static async updateMechanic(req: Request, res: Response) {

        const id = req.params.id
        const { error: invalidUUiD, value: UUID } = Joi.string()
            .uuid({ version: "uuidv4" })
            .validate(id); 

        if(invalidUUiD) throw new Error("Please enter a valid id");
        
        const { error, value } = mechanicSchema.tailor("update").validate(req.body);
        if (error) throw error;
        
        try {
            const mechanicUpdate = await sql`
                UPDATE mechanics SET ${sql(value)} 
                WHERE id = ${UUID} RETURNING *
            `;

            res.status(201).json({
                message: "Mechanic details updated successfully",
                payload: mechanicUpdate
            })
        } catch (error) {
            res.status(401).json({
                message: "Unable to update mechanic details",
                payload: error.message
            });
        }
    }


    static async deleteMechanic(req: Request, res: Response) {
        try {
            const id = req.params.id
            const deletedMechanic = await sql`DELETE FROM mechanics WHERE id = ${id} RETURNING *`;

            if(!deletedMechanic.length){
                throw new Error("Mechanic does not exist");
            }

           res.status(200).json({
               message: "Mechanic deleted successfully",
               payload: deletedMechanic
           })
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }
}

export default Mechanic;

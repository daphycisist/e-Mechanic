import { Request, Response } from "express";
import { validateRequestInput, validateUUIDInput } from "../validations/validations";
import sql from "../utilities/pg-config";
import { requestSchema } from "../schema/joiSchemas";
class Requests {
    static async getAllRequests(req: Request, res: Response) {
        try {
            const allMechanics = await sql`SELECT * FROM requests`;
            
            res.status(200).json({
                message: "Requests data successfully returned",
                payload: allMechanics
            })
        } catch (error) {
            res.status(400).json({
                message: "Error fetching Requests data",
                payload: error.message
            });
        }
    }

    static async getRequest(req: Request, res: Response) {
        try {
            const id = req.params.id
            const request = await sql`SELECT * FROM Requests WHERE id=${id}`;
            
            if(!request.length){
                throw new Error("Request does not exist");
            }

            res.status(200).json({
                message: "Requests data successfully returned",
                payload: request
            })
        } catch (error) {
            res.status(400).json({
                message: "Error fetching Requests data. " + error.message
            });
        }
    }

    static async createRequest(req: Request, res: Response) {
        try {
            const ValidRequestData = validateRequestInput(req.body);
            
            const request = await sql`INSERT INTO requests ${sql(ValidRequestData)} RETURNING *`

            res.status(201).json({
                message: "Request created successfully",
                payload: request
            });
        } catch (error) {
            res.status(401).json({
                message: "Oops!!! Error creating request",
                payload: error.message
            });
        }
    }


    static async updateRequest(req: Request, res: Response) {
        const id = req.params.id;
        const { error: UUIDerror, value: UUID } = validateUUIDInput(id);

        try {

            if (UUIDerror) {
                return res.status(400).json({
                    message: "Please provide a valid UUID"
                })
            }

            const { error, value } = requestSchema.tailor("update").validate(req.body);

            if (error) throw error;

            const requestUpdate = await sql`
                UPDATE requests SET ${sql(value)} 
                WHERE id = ${UUID} RETURNING *
            `;

            if (!requestUpdate.length) throw new Error("Request does not exist.");
            

            res.status(201).json({
                message: "Request updated successfully",
                payload: requestUpdate
            })
        } catch (error) {
            res.status(400).json({
                message: error.message
            });
        }
    }


    static async deleteRequest(req: Request, res: Response) {
        try {
            const id = req.params.id
            const deletedRequest = await sql`DELETE FROM requests WHERE id = ${id} RETURNING *`;

            if(!deletedRequest.length){
                throw new Error("Request does not exist");
            }

           res.status(200).json({
               message: "Request deleted successfully",
               payload: deletedRequest
           })
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }
}

export default Requests;

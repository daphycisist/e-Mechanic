import express, { Request, Response, NextFunction } from "express";


const router = express.Router()
import Controller from "../controller/controller"

router.get('/services', async(req, res, _next) => {
    const services = await Controller.services()
    return res.status(services.status).send(services)
})

router.get('/services/:id', async (req, res, _next) => {
    const id = req.params.id;
    const service = await Controller.getservice(id);
    res.status(service.status).send(service)
})


router.post('/services/post', async(req, res, _next) => {
    const post = req.body
    const service = await Controller.createService(post)
    res.status(service.status).send(service)

})

router.put('/services/:id', async (req, res, _next) => {
    const id = req.params.id
    const update = await Controller.updateService(id, req.body)
    res.status(update.status).send(update)
})

router.delete('/services/:id', async (req, res, next) => {
    const id = req.params.id
    const deleted = await Controller.deleteService(id);
    res.status(deleted.status).send(deleted)
})





export default router
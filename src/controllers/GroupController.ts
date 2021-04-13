import express, { Request, Response } from 'express'
import { body, param, query } from 'express-validator'
import { BadRequestError, validateRequest } from '@oregtickets/common'
import { Group } from './../models/Group'

const router = express.Router()

router.get('/api/users/:mode',
    [
        param('mode')
            .trim()
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        try {
            await Group.findAll()
        } catch (e) {
            console.log(e)
            throw new BadRequestError('')
        }
    })

    router.post('/api/group', [
    ],
        validateRequest, async (req: Request, res: Response) => {
            try {

                await Group.create(req.body)
                res.status(201).send(req.body)
            } catch (e) {
                console.log(e)
                throw new BadRequestError('Group could not get created!')
            }
        })
    

export { router as GroupController }

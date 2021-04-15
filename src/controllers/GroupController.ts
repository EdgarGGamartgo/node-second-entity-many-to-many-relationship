import express, { Request, Response } from 'express'
import { BadRequestError, validateRequest } from '@oregtickets/common'
import {
    deleteGroupById,
    saveGroupById,
    findGroupById,
    findAllGroups,
    createGroup,
} from './../services'
import {
    postValidation,
    getByIdValidation,
    putValidation,
    deleteValidation
} from './../middlewares'

const router = express.Router()


router.post('/api/group',
    postValidation,
    validateRequest, async (req: Request, res: Response) => {
        try {
            const group = await createGroup(req.body)
            res.status(201).send(group)
        } catch (e) {
            console.log(e)
            throw new BadRequestError('Group could not get created!')
        }
    })

router.get('/api/groups', async (req: Request, res: Response) => {
    try {
        const groups = await findAllGroups()
        res.status(200).send(groups)
    } catch (e) {
        console.log(e)
        throw new BadRequestError('could not retrieve Groups!!!')
    }
})

router.get('/api/group/:id',
    getByIdValidation,
    validateRequest, async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const group = await findGroupById(id)
            if (group) {
                res.status(200).send(group)
            }
            res.status(200).send([])
        } catch (e) {
            console.log(e)
            throw new BadRequestError('could not retrieve Group!!!')
        }
    })

router.put('/api/group',
    putValidation,
    validateRequest,
    async (req: Request, res: Response) => {
        try {
            const { id } = req.body
            const group = await saveGroupById(id, req.body)
            res.status(200).send(group)
        } catch (e) {
            console.log(e)
            throw new BadRequestError('could not update Group!!!')
        }
    })

router.delete('/api/group/:id',
    deleteValidation,
    validateRequest,
    async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const group = await deleteGroupById(id)
            return res.sendStatus(200).send(group)
        } catch (e) {
            console.log(e)
            throw new BadRequestError('could not delete Group!!!')
        }
    })


export { router as GroupController }

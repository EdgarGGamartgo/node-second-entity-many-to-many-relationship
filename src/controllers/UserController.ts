import express, { Request, Response } from 'express'
import { BadRequestError, validateRequest } from '@oregtickets/common'
import { 
    getAllUsersByIsDelete,
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addUsersToGroup,
 } from './../services'
import {
    getAllValidation,
    getUserByIdValidation,
    createUserValidation,
    updateUserValidation,
    deleteUserValidation,
    usersToGroupCreateValidation,
} from './../middlewares'

const router = express.Router()

router.post('/api/add-users-to-group',
    usersToGroupCreateValidation,
    validateRequest, async(req: Request, res: Response) => {
    try {
        const { groupId, userIds } = req.body
        const usersToGroup = await addUsersToGroup(groupId, userIds)
        res.status(201).send(usersToGroup)
    } catch (e) {
        console.log(e)
        throw new BadRequestError('Cant add users to group!!')
    }
})

router.get('/api/users/:mode',
    getAllValidation,
    validateRequest,
    async (req: Request, res: Response) => {
        const { mode } = req.params;
        try {
            if (mode === 'true') {
                const users = await getAllUsersByIsDelete(true)
                res.status(200).send(users);
            } else if (mode === 'false') {
                const users = await getAllUsersByIsDelete(false)
                res.status(200).send(users);
            } else if (mode === 'all') {
                const users = await getAllUsers()
                res.status(200).send(users);
            }
        } catch (e) {
            console.log(e)
            throw new BadRequestError('Cant retrieve users')
        }
    })


router.get('/api/user/:id',
    getUserByIdValidation,
    validateRequest,
    async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const user = await getUserById(id)
            res.status(200).send(user);
        } catch (e) {
            console.log(e)
            throw new BadRequestError('Cant retrieve user!');
        }
        
    })

router.post('/api/user', 
    createUserValidation,
    validateRequest, async (req: Request, res: Response) => {
        const { login, password, age } = req.body;
        try {
            const user = {
                login,
                password,
                age: +age,
                is_deleted: false
            }
            const createdUser = await createUser(user)
            res.status(201).send(createdUser)
        } catch (e) {
            console.log(e)
            throw new BadRequestError('User could not get created!')
        }
    })

router.put('/api/user',
    updateUserValidation,
    validateRequest, async (req: Request, res: Response) => {
        const { id } = req.body;
        try {
            const user = await updateUser(req.body, id)
            res.status(200).send(user);
        } catch (e) {
            console.log(e)
            throw new BadRequestError('Error updating the user');
        }
    })

router.delete('/api/user/:id',
    deleteUserValidation
    ,validateRequest, async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const user = await deleteUser(id)
            res.status(200).send(user);
        } catch (e) {
            console.log(e)
            throw new BadRequestError('User could not get deleted!')
        }
    })

export { router as UserController }

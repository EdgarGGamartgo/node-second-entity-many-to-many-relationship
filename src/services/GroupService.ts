import { Group } from './../models'
import { GroupAttrs } from './../types'

export const deleteGroupById = async (id: string) => {
    return await Group.destroy({
        where: {
            id
        }
    })
}

export const saveGroupById = async (id: string, group: GroupAttrs) => {
    return await Group.update(group, {
        where: {
            id
        }
    })
}

export const findGroupById = async(id: string) => {
    return await Group.findOne({
        where: {
            id
        }
    })
}

export const findAllGroups = async () => await Group.findAll()

export const createGroup = async (group: GroupAttrs) => await Group.create(group)

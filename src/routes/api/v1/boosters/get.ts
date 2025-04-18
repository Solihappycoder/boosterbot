import { Request, Response } from "express"
import { container } from "@sapphire/framework"

export default async (_req: Request, res: Response) => {
    const guild = await container.client.guilds.fetch('1318773616187412521');

    const boostingMembers = (await guild?.members.fetch()).filter(member => member.premiumSince)
    const boostingIds = boostingMembers.map(member => member.id)

    res.status(200).json({
        length: boostingIds.length,
        data: boostingIds
    })
}

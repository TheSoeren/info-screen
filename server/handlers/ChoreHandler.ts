import Constants from '../Constants.ts'
import Chore from '../types/Chore/Chore.ts'

export default class ChoreHandler {
    public static async getChores(): Promise<Array<Chore>> {
        const file = await Deno.readTextFile(Constants.CHORES_FILE_PATH)
        return JSON.parse(file)
    }

    public static async addChore(chore: Chore): Promise<void> {
        const chores: Array<Chore> = await this.getChores()
        chores.push(chore)

        await this.saveChores(chores)
    }

    public static async deleteChore(id: string): Promise<void> {
        const chores: Array<Chore> = await this.getChores()

        await this.saveChores(chores.filter(chore => chore.id !== id))
    }

    private static async saveChores(chores: Array<Chore>): Promise<void> {
        await Deno.writeTextFile(Constants.CHORES_FILE_PATH, JSON.stringify(chores))
    }
}
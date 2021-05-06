import Constants from '../Constants.ts'
import Chore from '../types/Chore/Chore.ts'

export default class ChoreHandler {
    /**
     * Get all the chores out of the chore file
     * @return {Promise<Array<Chore>>}
     */
    public static async getChores(): Promise<Array<Chore>> {
        const file = await Deno.readTextFile(Constants.CHORES_FILE_PATH)
        return JSON.parse(file)
    }

    /**
     * Add a chore to the chore file
     * @param {Chore} chore
     * @return {Promise<void>}
     */
    public static async addChore(chore: Chore): Promise<void> {
        const chores: Array<Chore> = await this.getChores()
        chores.push(chore)

        await this.saveChores(chores)
    }

    /**
     * Delete chore from a chore file by a specific id
     * @param {string} id
     * @return {Promise<void>}
     */
    public static async deleteChore(id: string): Promise<void> {
        const chores: Array<Chore> = await this.getChores()

        await this.saveChores(chores.filter(chore => chore.id !== id))
    }

    /**
     * Write chores array to the chore file
     * @param {Array<Chore>} chores
     * @return {Promise<void>}
     */
    private static async saveChores(chores: Array<Chore>): Promise<void> {
        await Deno.writeTextFile(Constants.CHORES_FILE_PATH, JSON.stringify(chores))
    }
}
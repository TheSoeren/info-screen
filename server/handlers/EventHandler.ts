import Constants from '../Constants.ts'
import Event from '../types/Event/Event.ts'

export default class EventHandler {
    /**
     * Get all the events out of the event file
     * @return {Promise<Array<Event>>}
     */
    public static async getEvents(): Promise<Array<Event>> {
        const file = await Deno.readTextFile(Constants.EVENTS_FILE_PATH)
        return JSON.parse(file)
    }

    /**
     * Add a event to the event file
     * @param {Event} event
     * @return {Promise<void>}
     */
    public static async addEvent(event: Event): Promise<void> {
        const events: Array<Event> = await this.getEvents()
        events.push(event)

        await this.saveEvents(events)
    }

    /**
     * Delete event from a event file by a specific id
     * @param {string} id
     * @return {Promise<void>}
     */
    public static async deleteEvent(id: string): Promise<void> {
        const events: Array<Event> = await this.getEvents()

        await this.saveEvents(events.filter(event => event.id !== id))
    }

    /**
     * Write event array to the event file
     * @param {Array<Event>} events
     * @return {Promise<void>}
     */
    private static async saveEvents(events: Array<Event>): Promise<void> {
        await Deno.writeTextFile(Constants.EVENTS_FILE_PATH, JSON.stringify(events))
    }
}
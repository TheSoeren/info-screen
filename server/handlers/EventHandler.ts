import Constants from '../Constants.ts'
import Event from '../types/Event/Event.ts'

export default class EventHandler {
    public static async getEvents(): Promise<Array<Event>> {
        const file = await Deno.readTextFile(Constants.EVENTS_FILE_PATH)
        return JSON.parse(file)
    }

    public static async addEvent(event: Event): Promise<void> {
        const events: Array<Event> = await this.getEvents()
        events.push(event)

        await this.saveEvents(events)
    }

    public static async deleteEvent(id: string): Promise<void> {
        const events: Array<Event> = await this.getEvents()

        await this.saveEvents(events.filter(event => event.id !== id))
    }

    private static async saveEvents(events: Array<Event>): Promise<void> {
        await Deno.writeTextFile(Constants.EVENTS_FILE_PATH, JSON.stringify(events))
    }
}
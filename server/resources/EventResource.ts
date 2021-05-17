import { Drash } from 'https://deno.land/x/drash@v1.4.4/mod.ts'
import EventHandler from '../handlers/EventHandler.ts'

export default class EventResource extends Drash.Http.Resource {
    static paths = ['/events/:id?']

    public async GET () {
        try {
            this.response.status_code = 200
            this.response.body = await EventHandler.getEvents()
        } catch (exception) {
            this.response.status_code = 500
            this.response.body = {
                error: 'not found',
                err: exception
            }
        }

        return this.response
    }

    public async DELETE () {
        const id: string | null = this.request.getPathParam('id')

        if (id) {
            try {
                await EventHandler.deleteEvent(id)

                this.response.status_code = 200
                this.response.body = {
                    success: 'Successfully saved'
                }
            } catch (exception) {
                this.response.status_code = 404
                this.response.body = {
                    error: 'Failed to save data',
                    err: exception
                }
            }
        } else {
            this.response.status_code = 404
            this.response.body = {
                error: 'Missing id parameter'
            }
        }

        return this.response
    }

    public async POST () {
        const body: any = this.request.getAllBodyParams().data

        try {
            await EventHandler.addEvent(body)

            this.response.status_code = 200
            this.response.body = {
                success: 'Successfully saved'
            }
        } catch (exception) {
            this.response.status_code = 404
            this.response.body = {
                error: 'Failed to save data',
                err: exception
            }
        }

        return this.response
    }
}
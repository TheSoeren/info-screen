interface Event {
    id: string
    title: string
    allDay: boolean
    start: string
    end: string
    content: string
    participants: Array<string>
    class: string
}

export default Event
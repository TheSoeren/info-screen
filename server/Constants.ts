export default class Constants {
    /**
     * All allowed origins for the server
     * @type {string[]}
     */
    public static ALLOWED_ORIGINS: Array<string | RegExp> = [
        'http://192.168.1.110',
        'http://localhost:8080'
    ]

    /**
     * The hostname of the server
     * @type {string}
     */
    public static SERVER_HOSTNAME: string = 'localhost'

    /**
     * The port of the server
     * @type {number}
     */
    public static SERVER_PORT: number = 8000

    /**
     * The path of the chores json file
     * @type {string}
     */
    public static CHORES_FILE_PATH: string = '../data/chores.json'

    /**
     * The path of the events json file
     * @type {string}
     */
    public static EVENTS_FILE_PATH: string = '../data/events.json'
}
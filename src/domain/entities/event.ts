import Court from './court.js';

export default interface Event {
    /**
     * Event internal id
     */
    id: number,

    /**
     * Id of court, where evert is based
     */
    courtId: Court['id'],

    /**
     * Name of the event
     */
    name: string,

    /**
     * Description of the event
     */
    description: string,

    /**
     * Array of timestamps without timezone (start and end of event)
     */
    time: [string, string]
}
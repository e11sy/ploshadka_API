import type User from './user.js';

export default interface Message {
    /**
     * Message internal id
     */
    id: number;

    /**
     * Time, when message was send
     */
    time: string,

    /**
     * Id of user, who messaged
     */
    userId: User['id'],

    /**
     * Source of the chat, where user messaged
     */
    source: 'court' | 'event',

    /**
     * Id of the concrete source 
     */
    sourceId: number;
}
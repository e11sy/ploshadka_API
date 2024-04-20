import { JsonObject } from './lib/types.js';
/**
 * Parse yaml file to object by path
 *
 * @param paths - yaml file path
 */
export default function loadConfig(...paths: Array<string | JsonObject>): JsonObject;

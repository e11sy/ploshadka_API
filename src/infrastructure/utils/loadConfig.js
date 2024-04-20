import * as yaml from 'js-yaml';
import * as fs from 'fs';
import merge from 'lodash.merge';
import isArray from 'lodash.isarray';
import { readEnvConfig } from './lib/env.js';
/**
 * Merge arrays, if there are arrays in objects
 *
 * @param objValue - object to merge with source
 * @param srcValue - source object
 */
function mergeArrays(objValue, srcValue) {
    if (isArray(objValue)) {
        return objValue.concat(srcValue);
    }
}
/**
 * Parse yaml file to object by path
 *
 * @param paths - yaml file path
 */
export default function loadConfig(...paths) {
    const configs = [];
    for (const path of paths) {
        if (typeof path === 'string') {
            configs.push(yaml.load(fs.readFileSync(path, 'utf8')));
        }
        else {
            configs.push(path);
        }
    }
    configs.push(readEnvConfig(process.env));
    const config = {};
    configs.forEach((file) => {
        merge(config, file, mergeArrays);
    });
    return config;
}

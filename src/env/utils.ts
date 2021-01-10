import { join } from 'path';
import { __MODELS__ } from './Models';

export const getOsEnv = (key: string): string | undefined => {
    return process.env[key];
};

export const getPath = (path: string): string => {
    return process.env.NODE_ENV === 'production'
        ? join(process.cwd(), path.replace('src/', 'dist/').slice(0, -3) + '.js')
        : join(process.cwd(), path);
};

export const getPaths = (paths: string[]): string[] => {
    return paths.map((p) => getPath(p));
};

export const getOsPath = (key: string): string => {
    const osEnv = getOsEnv(key);
    return osEnv ? getPath(osEnv) : undefined;
};

export const getOsPaths = (key: string): string[] => {
    return getPaths(getOsEnvArray(key));
};

export const getOsEnvArray = (key: string, delimiter: string = ','): string[] => {
    return (process.env[key] && process.env[key].split(delimiter)) || [];
};

export const toBool = (value: string): boolean => {
    return value === 'true';
};

/*
    The function below are used to configure TypeOrm connection
    If the code is bundled with webpack, TypeOrm loses it's references to the objects
    so we check if it's packed with webpack and if so we return an array with all objects imported
    if it's not, we return the path for typeorm's CLI
*/

// eslint-disable-next-line @typescript-eslint/ban-types
export const getOsEnvModels = (key: string): (string | (Function))[] => {
    return getOsEnv('isWebpacked') ? __MODELS__ : getOsPaths(key);
};

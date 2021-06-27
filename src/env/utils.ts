import { join } from 'path';

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

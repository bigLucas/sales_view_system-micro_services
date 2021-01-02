export const getOsEnv = (key: string): string | undefined => {
    return process.env[key];
};

import { getOsEnv } from './utils';

/** Use *utils.ts* functions to import values from `proccess.env()` */
export const env = {
    app: {
        region: getOsEnv('REGION'),
        stage: getOsEnv('STAGE'),
    },
    aws: {
        fileStorageBucketName: getOsEnv('FILE_STORAGE_BUCKET_NAME'),
    },
};

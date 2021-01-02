/* eslint-disable max-len */
import * as dayjs from 'dayjs';
import { ProxyResult, Context, Callback, Handler, ScheduledEvent } from 'aws-lambda';
import { ProxyResultBuilder } from '../../../core/ProxyResultBuilder';
import { CatchError } from '../../../decorators/CatchError';
import { ServerlessHandler } from '../../../core/ServerlessHandler';
import { DataGenerationService } from '../../services/DataGenerationService';
import { EDI } from '../../libs/EDI';
import { S3Service } from '../../services/S3Service';
import { env } from '../../../env/env';

class DataGenerationHandler extends ServerlessHandler<ScheduledEvent, ProxyResult> {
    private readonly BASE_FILE_NAME = '_SALES_EDI.txt';
    private readonly FILE_NAME_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss';

    @CatchError()
    public async onHandleEvent(_: ScheduledEvent, __: Context): Promise<ProxyResult> {
        const edi = DataGenerationService.generate();
        const fileContent = EDI.stringfy(edi);
        const fileName = `${dayjs().format(this.FILE_NAME_DATE_FORMAT)}${this.BASE_FILE_NAME}`;
        const s3Service = new S3Service(env.aws.fileStorageBucketName);
        await s3Service.upload(fileName, fileContent);

        return new ProxyResultBuilder().status(200).body({}).build();
    }

    public onReplyError(error: Error, callback: Callback): void {
        callback(error, new ProxyResultBuilder().status(500).body(error).build());
    }
}

export const handler: Handler = (event: ScheduledEvent, context: Context, cb: Callback) => {
    const mHandler = new DataGenerationHandler();
    mHandler.execute(event, context, cb);
};

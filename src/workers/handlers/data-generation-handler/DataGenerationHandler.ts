import {ProxyResult, Context, Callback, Handler, ScheduledEvent} from 'aws-lambda';
import axios from 'axios';
import ProxyResultBuilder from '../../../core/ProxyResultBuilder';
import CatchError from '../../../decorators/CatchError';
import ServerlessHandler from '../../../core/ServerlessHandler';

class DataGenerationHandler extends ServerlessHandler<ScheduledEvent, ProxyResult> {

    @CatchError()
    public async onHandleEvent(_: ScheduledEvent, __: Context): Promise<ProxyResult> {
        console.log(`I'm running`);
        const response = await axios.get('https://api.github.com/users/bigLucas');
        console.log('DEBUG ', response.data);
        return new ProxyResultBuilder().status(200).body('response').build();
    }

    public onReplyError(error: Error, callback: Callback): void {
        callback(error, new ProxyResultBuilder().status(500).body(error).build());
    }
}

export const handler: Handler = (event: ScheduledEvent, context: Context, cb: Callback) => {
    const mHandler = new DataGenerationHandler();
    mHandler.execute(event, context, cb);
};

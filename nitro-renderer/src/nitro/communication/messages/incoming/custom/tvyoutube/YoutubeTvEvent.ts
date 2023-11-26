import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { YoutubeTvParser } from '../../../parser/custom/tvyoutube/YoutubeTvParser';

export class YoutubeTvEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, YoutubeTvParser);
    }

    getParser(): YoutubeTvParser
    {
        return this.parser as YoutubeTvParser;
    }
}

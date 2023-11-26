import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { RpStatsParser } from '../../../parser/custom/roleplay/RpStatsParser';

export class RpStatsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RpStatsParser);
    }

    getParser(): RpStatsParser
    {
        return this.parser as RpStatsParser;
    }
}

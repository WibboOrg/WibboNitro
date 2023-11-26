import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { StopSoundParser } from '../../../parser/custom/sound/StopSoundParser';

export class StopSoundEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, StopSoundParser);
    }

    getParser(): StopSoundParser
    {
        return this.parser as StopSoundParser;
    }
}

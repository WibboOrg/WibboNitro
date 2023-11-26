import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { PlaySoundParser } from '../../../parser/custom/sound/PlaySoundParser';

export class PlaySoundEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PlaySoundParser);
    }

    getParser(): PlaySoundParser
    {
        return this.parser as PlaySoundParser;
    }
}

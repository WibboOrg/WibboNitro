import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { UserBannerParser } from '../../../parser';

export class UserBannerEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserBannerParser);
    }

    public getParser(): UserBannerParser
    {
        return this.parser as UserBannerParser;
    }
}

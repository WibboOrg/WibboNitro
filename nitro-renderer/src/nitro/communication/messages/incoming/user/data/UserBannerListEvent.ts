import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { UserBannerListParser } from '../../../parser';

export class UserBannerListEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserBannerListParser);
    }

    public getParser(): UserBannerListParser
    {
        return this.parser as UserBannerListParser;
    }
}

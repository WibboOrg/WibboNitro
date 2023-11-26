import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class NotifTopParser implements IMessageParser
{
    msgTxt: string;

    public flush(): boolean
    {
        this.msgTxt = '';

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this.msgTxt = wrapper.readString();

        return true;
    }
}

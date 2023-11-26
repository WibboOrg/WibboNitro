import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class RpTrocStartParser implements IMessageParser
{
    userId: number;
    userName: string;

    public flush(): boolean
    {
        this.userId = 0;
        this.userName = '';

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this.userId = wrapper.readInt();
        this.userName = wrapper.readString();

        return true;
    }
}

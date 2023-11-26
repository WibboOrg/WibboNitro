import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class AddChatlogsParser implements IMessageParser
{
    userId: number;
    userName: string;
    userMsg: string;

    public flush(): boolean
    {
        this.userId = 0;
        this.userName = '';
        this.userMsg = '';

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this.userId = wrapper.readInt();
        this.userName = wrapper.readString();
        this.userMsg = wrapper.readString();

        return true;
    }
}

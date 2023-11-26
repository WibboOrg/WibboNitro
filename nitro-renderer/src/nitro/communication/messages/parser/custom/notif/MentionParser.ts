import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class MentionParser implements IMessageParser
{
    userId: number;
    username: string;
    look: string;
    msg: string;

    public flush(): boolean
    {
        this.userId = 0;
        this.username = '';
        this.look = '';
        this.msg = '';

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this.userId = wrapper.readInt();
        this.username = wrapper.readString();
        this.look = wrapper.readString();
        this.msg = wrapper.readString();

        return true;
    }

    get mention(): IMention
    {
        return { userId: this.userId, username: this.username, look: this.look, msg: this.msg, time: Date.now() / 1000 };
    }

}

export interface IMention
{
    userId: number,
    username: string,
    look: string,
    msg: string,
    time: number
}

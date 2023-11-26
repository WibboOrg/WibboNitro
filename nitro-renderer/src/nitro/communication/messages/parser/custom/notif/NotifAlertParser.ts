import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class NotifAlertParser implements IMessageParser
{
    image: string;
    title: string;
    msgTxt: string;
    btnTxt: string;
    roomId: number;
    link: string;

    public flush(): boolean
    {
        this.image = '';
        this.title = '';
        this.msgTxt = '';
        this.btnTxt = '';
        this.roomId = 0;
        this.link = '';

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this.image = wrapper.readString();
        this.title = wrapper.readString();
        this.msgTxt = wrapper.readString();
        this.btnTxt = wrapper.readString();
        this.roomId = wrapper.readInt();
        this.link = wrapper.readString();

        return true;
    }
}

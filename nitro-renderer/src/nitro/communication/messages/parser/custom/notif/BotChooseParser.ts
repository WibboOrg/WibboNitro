import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class BotChooseParser implements IMessageParser
{
    botChooses: IBotChoose[];

    public flush(): boolean
    {
        this.botChooses = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        const totalChooses = wrapper.readInt();

        for(let i = 0; i < totalChooses; i++)
        {
            const username = wrapper.readString();
            const code = wrapper.readString();
            const message = wrapper.readString();
            const look = wrapper.readString();

            this.botChooses.push({ username: username, message: message, code: code, look: look });
        }

        return true;
    }
}

export interface IBotChoose
{
    username: string,
    message: string,
    code: string,
    look: string
}

import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class BadgeRemovedParser implements IMessageParser
{
    private _badgeCode: string;

    public flush(): boolean
    {
        this._badgeCode = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._badgeCode = wrapper.readString();

        return true;
    }

    public get badgeCode(): string
    {
        return this._badgeCode;
    }
}

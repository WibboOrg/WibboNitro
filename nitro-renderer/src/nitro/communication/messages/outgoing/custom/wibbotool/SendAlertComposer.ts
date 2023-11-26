import { IMessageComposer } from '../../../../../../api';

export class SendAlertComposer implements IMessageComposer<ConstructorParameters<typeof SendAlertComposer>>
{
    private _data: ConstructorParameters<typeof SendAlertComposer>;

    constructor(eventAlert: boolean, message: string, link: string, preview: boolean)
    {
        this._data = [ eventAlert, message, link, preview ];
    }

    public dispose(): void
    {
        return;
    }

    public getMessageArray()
    {
        return this._data;
    }
}

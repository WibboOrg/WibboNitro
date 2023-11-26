import { RoomObjectVariable } from '../../../../../api';
import { Nitro } from '../../../../Nitro';
import { FurnitureDynamicThumbnailVisualization } from './FurnitureDynamicThumbnailVisualization';

export class FurnitureExternalImageVisualization extends FurnitureDynamicThumbnailVisualization
{
    private _url: string;
    private _typePrefix: string;

    constructor()
    {
        super();

        this._url = null;
        this._typePrefix = null;
    }

    protected getThumbnailURL(): string
    {
        if(!this.object) return null;

        if(this._url) return this._url;

        const jsonString = this.object.model.getValue<string>(RoomObjectVariable.FURNITURE_DATA);

        if(!jsonString || jsonString === '') return null;

        if(this.object.type.indexOf('') >= 0)
        {
            this._typePrefix = (this.object.type.indexOf('') >= 0) ? '' : 'postcards/selfie/';
        }

        const json = JSON.parse(jsonString);

        let url = (json.w || '');

        if(url !== '')
            url = Nitro.instance.getConfiguration<string>('cdn.url') + url;

        url = this.buildThumbnailUrl(url);

        this._url = url;

        return this._url;
    }

    private buildThumbnailUrl(url: string): string
    {
        url = url.replace('_small.png', '.png');

        if(url.indexOf('.png') === -1) url = (url + '.png'); //_small

        return url;
    }
}

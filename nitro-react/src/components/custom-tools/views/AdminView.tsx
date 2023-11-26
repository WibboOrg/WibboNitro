import { FC } from 'react';
import { GetConfiguration } from '../../../api';
import { DraggableWindowPosition, NitroCardContentView, NitroCardHeaderView, NitroCardView } from '../../../common';

interface AdminViewProps
{
    onCloseClick: () => void;
}

export const AdminView: FC<AdminViewProps> = props =>
{
    const { onCloseClick = null } = props;

    return (
        <NitroCardView className="nitro-custom-tools-admin" theme="primary-slim" windowPosition={ DraggableWindowPosition.TOP_LEFT }>
            <NitroCardHeaderView headerText={ 'Administration' } onCloseClick={ onCloseClick } />
            <NitroCardContentView className="text-black h-100">
                <iframe src={ GetConfiguration<string>('url.admin') } width="100%" height="100%" frameBorder="0"></iframe>
            </NitroCardContentView>
        </NitroCardView>
    );
}

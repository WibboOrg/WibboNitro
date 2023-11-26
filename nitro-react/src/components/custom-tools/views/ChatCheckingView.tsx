import { FollowFriendMessageComposer } from '@nitrots/nitro-renderer';
import { FC, useCallback, useMemo } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { SendMessageComposer } from '../../../api';
import { DraggableWindowPosition, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from '../../../common';
import { IChatLog } from '../common/IChatLog';

interface ChatCheckingViewProps
{
    chatLogs: IChatLog[];
    onCloseClick: () => void;
}

export const ChatCheckingView: FC<ChatCheckingViewProps> = props =>
{
    const { onCloseClick = null, chatLogs = [] } = props;

    const reverseChatLogs = useMemo(() => chatLogs.slice().reverse(), [ chatLogs ]);

    const followUserId = useCallback((userId: number) => SendMessageComposer(new FollowFriendMessageComposer(userId)), []);

    return (
        <NitroCardView className="nitro-custom-tools-chatlog" theme="primary-slim" windowPosition={ DraggableWindowPosition.TOP_LEFT }>
            <NitroCardHeaderView headerText={ 'Chatlog vérification' } onCloseClick={ onCloseClick } />
            <NitroCardContentView className="text-black h-100">
                <table className="table table-striped table-sm table-text-small text-black m-0">
                    <tbody>
                        <tr>
                            <th scope="row">Date</th>
                            <th scope="row">Pseudonyme</th>
                            <th scope="row">Message à vérifier</th>
                        </tr>
                        { reverseChatLogs.map((log, index) => <tr key={ index }>
                            <td className="align-middle">{ log.time }</td>
                            <td className="align-middle">
                                <OverlayTrigger
                                    placement="top"
                                    overlay={
                                        <Tooltip>Rejoindre { log.userName }</Tooltip>
                                    }>
                                    <Text bold className="cursor-pointer" onClick={ () => followUserId(log.userId) }>{ log.userName }</Text>
                                </OverlayTrigger>
                            </td>
                            <td className="align-middle">{ log.userMsg }</td>
                        </tr>) }
                    </tbody>
                </table>
            </NitroCardContentView>
        </NitroCardView>
    );
}

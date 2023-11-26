import { FriendlyTime, RequestFriendComposer, UserProfileParser } from '@nitrots/nitro-renderer';
import { FC, useEffect, useState } from 'react';
import { GetSessionDataManager, LocalizeText, SendMessageComposer } from '../../../api';
import { Column, Flex, LayoutAvatarBannerView, Text } from '../../../common';

interface UserContainerViewProps
{
    userProfile: UserProfileParser;
    banner: { id: number; haveLayer: boolean };
}

export const UserContainerView: FC<UserContainerViewProps> = props =>
{
    const { userProfile = null, banner = null } = props;
    const [ requestSent, setRequestSent ] = useState(userProfile.requestSent);
    const isOwnProfile = (userProfile.id === GetSessionDataManager().userId);
    const canSendFriendRequest = !requestSent && (!isOwnProfile && !userProfile.isMyFriend && !userProfile.requestSent);

    const addFriend = () =>
    {
        setRequestSent(true);

        SendMessageComposer(new RequestFriendComposer(userProfile.username));
    }

    useEffect(() =>
    {
        setRequestSent(userProfile.requestSent);
    }, [ userProfile ])

    return (
        <Flex gap={ 2 }>
            <Column center className="avatar-container">
                <LayoutAvatarBannerView banner={ banner } figure={ userProfile.figure } direction={ 2 } />
            </Column>
            <Column>
                <Column gap={ 0 }>
                    <Text bold>{ userProfile.username }</Text>
                    <Text italics textBreak small>{ userProfile.motto }&nbsp;</Text>
                </Column>
                <Column gap={ 1 }>
                    <Text small dangerouslySetInnerHTML={ { __html: LocalizeText('extendedprofile.created', [ 'created' ], [ userProfile.registration ]) } }></Text>
                    <Text small dangerouslySetInnerHTML={ { __html: LocalizeText('extendedprofile.last.login', [ 'lastlogin' ], [ FriendlyTime.format(userProfile.secondsSinceLastVisit, '.ago', 2) ]) } }></Text>
                    <Text small>
                        <b>{ LocalizeText('extendedprofile.achievementscore') }</b> { userProfile.achievementPoints }
                    </Text>
                </Column>
                <Flex gap={ 1 }>
                    { userProfile.isOnline &&
                        <i className="icon icon-pf-online" /> }
                    { !userProfile.isOnline &&
                        <i className="icon icon-pf-offline" /> }
                    <Flex alignItems="center" gap={ 1 }>
                        { canSendFriendRequest &&
                            <Text small underline pointer onClick={ addFriend }>{ LocalizeText('extendedprofile.addasafriend') }</Text> }
                        { !canSendFriendRequest &&
                            <>
                                <i className="icon icon-pf-tick" />
                                { isOwnProfile &&
                                    <Text>{ LocalizeText('extendedprofile.me') }</Text> }
                                { userProfile.isMyFriend &&
                                    <Text>{ LocalizeText('extendedprofile.friend') }</Text> }
                                { (requestSent || userProfile.requestSent) &&
                                    <Text>{ LocalizeText('extendedprofile.friendrequestsent') }</Text> }
                            </> }
                    </Flex>
                </Flex>
            </Column>
        </Flex>
    )
}

import { RelationshipStatusInfoMessageParser } from '@nitrots/nitro-renderer';
import { FC } from 'react';
import { LocalizeText } from '../../../api';
import { Column, Text } from '../../../common';
import { RelationshipsContainerView } from './RelationshipsContainerView';

interface FriendsContainerViewProps
{
    relationships: RelationshipStatusInfoMessageParser;
    friendsCount: number;
}

export const FriendsContainerView: FC<FriendsContainerViewProps> = props => 
{
    const { relationships = null, friendsCount = null } = props;

    return (
        <Column gap={ 1 }>
            <Text small dangerouslySetInnerHTML={ { __html: LocalizeText('extendedprofile.friends.count', [ 'count' ], [ friendsCount.toString() ]) } }></Text>
            <Text bold small>{ LocalizeText('extendedprofile.relstatus') }</Text>
            <Column>
                <RelationshipsContainerView relationships={ relationships } />
            </Column>
        </Column>
    )
}

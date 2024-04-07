import { FC } from 'react';
import { LocalizeBadgeName, LocalizeText } from '../../../../api';
import { Button, Column, Flex, LayoutBadgeImageView, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from '../../../../common';
import { useFurnitureBadgeTrocWidget } from '../../../../hooks';

export const FurnitureBadgeTrocView: FC<{}> = props =>
{
    const { objectId = -1, onClose, onConfirm, badgeId } = useFurnitureBadgeTrocWidget();

    if (objectId === -1 || badgeId === '') return null;

    return (
        <NitroCardView className="nitro-widget-troc-badge" theme="primary-slim">
            <NitroCardHeaderView headerText={ 'Echange de badge' } onCloseClick={ onClose } />
            <NitroCardContentView>
                <Flex overflow="hidden" gap={ 2 } fullHeight>
                    <Column center>
                        <LayoutBadgeImageView badgeCode={ badgeId } />
                    </Column>
                    <Column grow justifyContent="between" overflow="hidden">
                        <Column gap={ 1 } overflow="auto">
                            <Text fontWeight="bold">{ LocalizeBadgeName(badgeId) }</Text>
                            <Text>{ 'Veux-tu convertir en badge ?' }</Text>
                        </Column>
                        <Button variant="success" onClick={ onConfirm }>
                            { LocalizeText('catalog.redeem.dialog.button.exchange') }
                        </Button>
                    </Column>
                </Flex>
            </NitroCardContentView>
        </NitroCardView>
    );
}

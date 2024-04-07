import { FC } from 'react';
import { LocalizeText } from '../../../../api';
import { Button, Column, Flex, LayoutAvatarBannerView, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from '../../../../common';
import { useFurnitureBannerTrocWidget } from '../../../../hooks';

export const FurnitureBannerTrocView: FC<{}> = props =>
{
    const { objectId = -1, onClose, onConfirm, bannerId, bannerHaveLayer } = useFurnitureBannerTrocWidget();

    if (objectId === -1 || bannerId === -1) return null;

    return (
        <NitroCardView className="nitro-widget-troc-banner" theme="primary-slim">
            <NitroCardHeaderView headerText={ 'Echange de bannière' } onCloseClick={ onClose } />
            <NitroCardContentView>
                <Flex overflow="hidden" gap={ 2 } fullHeight>
                    <Column center>
                        <LayoutAvatarBannerView banner={ { id: bannerId, haveLayer: bannerHaveLayer } } />
                    </Column>
                    <Column grow justifyContent="between" overflow="hidden">
                        <Column gap={ 1 } overflow="auto">
                            <Text fontWeight="bold">{ 'Bannière ' + bannerId }</Text>
                            <Text>{ 'Veux-tu convertir en bannière ?' }</Text>
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

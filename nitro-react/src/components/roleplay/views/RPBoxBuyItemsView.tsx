import { IRoleplayItem, RpBuyItemsComposer } from '@nitrots/nitro-renderer';
import classNames from 'classnames';
import { FC, useCallback } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BbCode, GetConfiguration, SendMessageComposer } from '../../../api';
import { Base, Button, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from '../../../common';
import { useRoleplayContext } from '../RoleplayContext';

export const RPBoxBuyItemsView: FC<{}> = props =>
{
    const { stats, buyItems, setBuyItems, setBuyItemsIsOpen, buyItemsIsOpen } = useRoleplayContext();

    const buyItem = useCallback((itemId: number) =>
    {
        const item = buyItems.find(i => i.id === itemId);
        if (!item) return;
        
        if (item.price > stats.money) return;

        SendMessageComposer(new RpBuyItemsComposer(itemId, item.count));
    }, [ buyItems, stats ]);
    
    const updateItemCount = useCallback((item: IRoleplayItem, count: number) =>
    {
        if (count <= 0 || count > 99 || !count) return;

        setBuyItems(prevValue => prevValue.map(i => i.id === item.id ? { ...i, count } : i));
    }, [ setBuyItems ]);
    
    const close = useCallback(() =>
    {
        setBuyItemsIsOpen(false);
    }, [ setBuyItemsIsOpen ]);

    if (!buyItemsIsOpen || !buyItems || buyItems.length === 0) return null;

    return (
        <NitroCardView uniqueKey="rp-buyitems" className="rp-buyitems" theme="primary-slim">
            <NitroCardHeaderView headerText={ 'Achat d\'objet' } onCloseClick={ () => close() } />
            <NitroCardContentView>
                <table className="table table-striped table-sm table-text-small text-black m-0">
                    <tbody>
                        <tr>
                            <th>Objet</th>
                            <th>Prix</th>
                            <th>Nombre</th>
                            <th>Action</th>
                        </tr>
                        { buyItems && buyItems.map((item, index) => (
                            <tr key={ index }>
                                <td className="align-middle">
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={
                                            <Tooltip><Base dangerouslySetInnerHTML={ { __html: BbCode(item.desc) } } /></Tooltip>
                                        }>
                                        <div className={ 'container_item ' + classNames({ 'no_money': (item.price * item.count > stats.money) }) }>
                                            <img className="item" src={ GetConfiguration<string>('item.rp.images.url').replace('%image%', item.name) } />
                                        </div>
                                    </OverlayTrigger>
                                </td>
                                <td className="align-middle"><Text bold>{ item.price > 0 ? `${ item.price } Dollars` : 'Gratuit' }</Text></td>
                                <td className="align-middle">
                                    <input type="number" className="form-control form-control-sm" value={ item.count } min={ 1 } max={ 99 } onChange={ event => updateItemCount(item, event.target.valueAsNumber) } />
                                </td>
                                <td className="align-middle">
                                    <Button gap={ 1 } onClick={ () => buyItem(item.id) } disabled={ item.price * item.count > stats.money }>
                                        { item.price > 0 ? 'Acheter' : 'Prendre' }
                                    </Button>
                                </td>
                            </tr>
                        )) }
                    </tbody>
                </table>
            </NitroCardContentView>
        </NitroCardView>
    );
}

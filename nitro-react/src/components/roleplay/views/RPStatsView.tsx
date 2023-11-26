import { FC, useCallback, useMemo } from 'react';
import { DraggableWindow, DraggableWindowPosition, Flex } from '../../../common';
import { useRoleplayContext } from '../RoleplayContext';

export const RPStatsView: FC<{}> = props =>
{
    const { stats, setInventoryIsOpen } = useRoleplayContext();
  
    const toggleInventory = useCallback(() =>
    {
        setInventoryIsOpen(value => !value);
    }, [ setInventoryIsOpen ]);

    const energyPourcent = useMemo(() => Math.floor((stats.energy / 100) * 100) , [ stats ]); 
    const lifePourcent = useMemo(() => Math.floor((stats.health / stats.healthMax) * 100) , [ stats ]); 

    return (
        <DraggableWindow windowPosition={ DraggableWindowPosition.TOP_LEFT } uniqueKey="roleplay-stats">
            <div className="rp-stats drag-handler">
                <div className="rp-stats__bar rp-stats__bar-container life">
                    <div className="barre_pourcent life_pourcent" style={ { width: `${ lifePourcent }%` } }></div>
                    <span className="barre_text">{ stats.health }/{ stats.healthMax }</span>
                </div>
                <div className="rp-stats__bar rp-stats__bar-container energy">
                    <div className="barre_pourcent energy_pourcent" style={ { width: `${ energyPourcent }%` } }></div>
                    <span className="barre_text">{ stats.energy }/100</span>
                </div>
                <Flex gap={ 1 }>
                    <span className="rp-stats__bar money money--dollars">{ stats.money }</span>
                    <span className="rp-stats__bar ammunition">{ stats.ammunition }</span>
                    <span className="rp-stats__bar level">{ stats.level }</span>
                </Flex>
                <div className="rp-stats__btn-bar">
                    <span className="sac-inventory" onClick={ toggleInventory }></span>
                </div>
            </div>
        </DraggableWindow>
    );
}

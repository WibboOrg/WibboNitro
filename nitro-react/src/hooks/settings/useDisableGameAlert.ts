import { useBetween } from 'use-between';
import { LocalStorageKeys } from '../../api';
import { useLocalStorage } from '../useLocalStorage';

const useDisableGameAlertState = () => useLocalStorage(LocalStorageKeys.SETTINGS_DISABLED_GAME_ALERT, false);

export const useDisableGameAlert = () => useBetween(useDisableGameAlertState);

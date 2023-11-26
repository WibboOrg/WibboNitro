export const GetLocalStorage = <T>(key: string) =>
{
    try
    {
        const value = window.localStorage.getItem(key);
        return JSON.parse(value) as T ?? value
    }
    catch(e)
    {
        return null;
    }
}

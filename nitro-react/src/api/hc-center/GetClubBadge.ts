const DEFAULT_BADGE: string = 'WC_CLASSIC';
const BADGES: string[] = [ 'WC_CLASSIC', 'WC_EPIC', 'WC_LEGEND' ];

export const GetClubBadge = (badgeCodes: string[]) =>
{
    let badgeCode: string = null;

    BADGES.forEach(badge => ((badgeCodes.indexOf(badge) > -1) && (badgeCode = badge)));

    return (badgeCode || DEFAULT_BADGE);
}

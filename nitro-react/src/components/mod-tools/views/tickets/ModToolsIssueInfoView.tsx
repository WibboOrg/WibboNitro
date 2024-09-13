import { CloseIssuesMessageComposer, ReleaseIssuesMessageComposer } from '@nitrots/nitro-renderer';
import { FC, useState } from 'react';
import { GetIssueCategoryName, LocalizeText, SendMessageComposer } from '../../../../api';
import { Button, Column, Grid, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from '../../../../common';
import { useModTools } from '../../../../hooks';
import { CfhChatlogView } from './CfhChatlogView';

interface IssueInfoViewProps
{
    issueId: number;
    onIssueInfoClosed(issueId: number): void;
}

export const ModToolsIssueInfoView: FC<IssueInfoViewProps> = props =>
{
    const { issueId = null, onIssueInfoClosed = null } = props;
    const [ cfhChatlogOpen, setcfhChatlogOpen ] = useState(false);
    const { tickets = [], openUserInfo = null } = useModTools();
    const ticket = tickets.find(issue => (issue.issueId === issueId));

    const releaseIssue = (issueId: number) =>
    {
        SendMessageComposer(new ReleaseIssuesMessageComposer([ issueId ]));

        onIssueInfoClosed(issueId);
    }

    const closeIssue = (resolutionType: number) =>
    {
        SendMessageComposer(new CloseIssuesMessageComposer([ issueId ], resolutionType));

        onIssueInfoClosed(issueId)
    }
    
    return (
        <>
            <NitroCardView className="nitro-mod-tools-handle-issue" theme="primary-slim">
                <NitroCardHeaderView headerText={ 'Résolution du ticket n°' + issueId } onCloseClick={ () => onIssueInfoClosed(issueId) } />
                <NitroCardContentView className="text-black">
                    <Text fontSize={ 4 }>Information</Text>
                    <Grid overflow="auto">
                        <Column size={ 8 }>
                            <table className="table table-striped table-sm table-text-small text-black m-0">
                                <tbody>
                                    <tr>
                                        <th>Source</th>
                                        <td>{ GetIssueCategoryName(ticket.categoryId) }</td>
                                    </tr>
                                    <tr>
                                        <th>Categorie</th>
                                        <td className="text-break">{ LocalizeText('help.cfh.topic.' + ticket.reportedCategoryId) }</td>
                                    </tr>
                                    <tr>
                                        <th>Description</th>
                                        <td className="text-break">{ ticket.message }</td>
                                    </tr>
                                    <tr>
                                        <th>Victime</th>
                                        <td>
                                            <Text bold underline pointer onClick={ event => openUserInfo(ticket.reporterUserId) }>{ ticket.reporterUserName }</Text>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Prévenu(e)</th>
                                        <td>
                                            <Text bold underline pointer onClick={ event => openUserInfo(ticket.reportedUserId) }>{ ticket.reportedUserName }</Text>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Column>
                        <Column size={ 4 } gap={ 1 }>
                            <Button variant="secondary" onClick={ () => setcfhChatlogOpen(!cfhChatlogOpen) }>Tchat&apos;log</Button>
                            <Button onClick={ event => closeIssue(CloseIssuesMessageComposer.RESOLUTION_USELESS) }>Inutile</Button>
                            <Button variant="danger" onClick={ event => closeIssue(CloseIssuesMessageComposer.RESOLUTION_ABUSIVE) }>Abusif</Button>
                            <Button variant="success" onClick={ event => closeIssue(CloseIssuesMessageComposer.RESOLUTION_RESOLVED) }>Résolu</Button> 
                            <Button variant="secondary" onClick={ event => releaseIssue(issueId) } >Libérer le ticket</Button>
                        </Column>
                    </Grid>
                </NitroCardContentView>
            </NitroCardView>
            { cfhChatlogOpen &&
                <CfhChatlogView issueId={ issueId } onCloseClick={ () => setcfhChatlogOpen(false) }/> }
        </>
    );
}

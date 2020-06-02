/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import * as React from 'react';
import { ActionButton } from 'office-ui-fabric-react';
import '../../../css/_deviceListPaging.scss';
import { useLocalizationContext } from '../../../shared/contexts/localizationContext';
import { ResourceKeys } from '../../../../localization/resourceKeys';

export interface ListPagingDataProps {
    continuationTokens: string[];
    currentPageIndex: number;
}
export interface ListPagingDispatchProps {
    fetchPage: (pageNumber: number) => void;
}
export const ListPaging: React.FC<ListPagingDataProps & ListPagingDispatchProps> = (props: ListPagingDataProps & ListPagingDispatchProps) => {
    const { t } = useLocalizationContext();
    const { continuationTokens, currentPageIndex, fetchPage } = props;

    const renderSection = () => {
        return (
            <section role="navigation" className="grid-paging">
                <span className="pages">{t(ResourceKeys.deviceLists.paging.pages)}</span>
                <div role="list" className="page-list">
                    {continuationTokens.map(renderListItem)}
                </div>
            </section>
        );
    };

    const renderListItem = (continuationToken: string, index: number) => {
        const onFetchPageClick = () => {
            fetchPage(index);
        };

        return (
            <div
                key={`page_${index}`}
                role="listitem"
                className={index === currentPageIndex ? 'selected' : ''}
            >
                {index !== currentPageIndex ?
                    (<ActionButton
                        onClick={onFetchPageClick}
                    >
                        {index === continuationTokens.length - 1 ? '»' : index + 1}
                    </ActionButton>) :
                    (<span>{index + 1}</span>)
                }
            </div>
        );
    };

    return (
            (continuationTokens && continuationTokens.length > 0 && renderSection()) || <></>
        );
};

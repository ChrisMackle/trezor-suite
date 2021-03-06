import React from 'react';
import styled from 'styled-components';
import { LayoutContext } from '@suite-components';
import { AccountsMenu } from '@wallet-components';
import AccountLoader from './components/AccountLoader';
import Exception from '@wallet-components/AccountException';
import AccountMode from '@wallet-components/AccountMode';
import AccountAnnouncement from '@wallet-components/AccountAnnouncement';
import AccountTopPanel from '@wallet-components/AccountTopPanel';
import { MAX_WIDTH_WALLET_CONTENT } from '@suite-constants/layout';
import { AppState, ExtendedMessageDescriptor } from '@suite-types';
import { useTranslation } from '@suite-hooks/useTranslation';

const Wrapper = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    max-width: ${MAX_WIDTH_WALLET_CONTENT};
    width: 100%;
    height: 100%;
`;

type Props = {
    title: ExtendedMessageDescriptor['id'];
    children?: React.ReactNode;
    account: AppState['wallet']['selectedAccount'];
};

const WalletLayout = (props: Props) => {
    const { setLayout } = React.useContext(LayoutContext);
    const { translationString } = useTranslation();
    const l10nTitle = translationString(props.title);

    React.useEffect(() => {
        if (setLayout) setLayout(l10nTitle, <AccountsMenu />, <AccountTopPanel />);
    }, [l10nTitle, setLayout]);
    const { account } = props;

    if (account.status === 'loading') {
        return (
            <Wrapper>
                <AccountLoader type={account.loader} />
            </Wrapper>
        );
    }

    if (account.status === 'exception') {
        return (
            <Wrapper>
                <AccountMode mode={account.mode} />
                <AccountAnnouncement selectedAccount={account} />
                <Exception account={account} />
            </Wrapper>
        );
    }

    // if (account.imported) {
    // TODO
    // }

    return (
        <Wrapper>
            <AccountMode mode={account.mode} />
            <AccountAnnouncement selectedAccount={account} />
            {/* <WalletNotifications /> */}
            {props.children}
        </Wrapper>
    );
};

export default WalletLayout;

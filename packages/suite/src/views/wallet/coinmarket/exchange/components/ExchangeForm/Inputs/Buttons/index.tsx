import { colors, variables } from '@trezor/components';
import React from 'react';
import BigNumber from 'bignumber.js';
import { Translation } from '@suite-components';
import styled from 'styled-components';
import { invityApiSymbolToSymbol } from '@wallet-utils/coinmarket/coinmarketUtils';
import { useCoinmarketExchangeFormContext } from '@suite/hooks/wallet/useCoinmarketExchangeForm';

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: ${variables.SCREEN_SIZE.LG}) {
        margin-top: 27px;
    }
`;

const TokenBalance = styled.div`
    padding: 0px 6px;
    font-size: ${variables.NEUE_FONT_SIZE.TINY};
    color: ${colors.NEUE_TYPE_LIGHT_GREY};
`;

const TokenBalanceValue = styled.span`
    font-weight: ${variables.FONT_WEIGHT.DEMI_BOLD};
`;

const Left = styled.div`
    display: flex;
`;

const Button = styled.div`
    padding: 4px 6px;
    margin-right: 10px;
    cursor: pointer;
    border-radius: 4px;
    background-color: ${colors.NEUE_BG_GRAY};
    color: ${colors.NEUE_TYPE_DARK_GREY};
    font-size: ${variables.FONT_SIZE.TINY};
    font-weight: ${variables.FONT_WEIGHT.MEDIUM};
`;

const Bottom = () => {
    const { compose, token, account, setMax, network } = useCoinmarketExchangeFormContext();
    const formattedToken = invityApiSymbolToSymbol(token);
    const tokenData = account.tokens?.find(t => t.symbol === formattedToken);

    return (
        <Wrapper>
            <Left>
                <Button
                    onClick={() => {
                        setMax(true);
                        compose({
                            setMax: true,
                            fillValue: true,
                        });
                    }}
                >
                    All
                </Button>
                <Button
                    onClick={async () => {
                        setMax(false);
                        compose({
                            setMax: false,
                            fillValue: true,
                            amount: tokenData
                                ? new BigNumber(tokenData.balance || '0')
                                      .dividedBy(2)
                                      .toFixed(tokenData.decimals)
                                : new BigNumber(account.formattedBalance)
                                      .dividedBy(2)
                                      .toFixed(network.decimals),
                        });
                    }}
                >
                    1/2
                </Button>
                <Button
                    onClick={async () => {
                        setMax(false);
                        compose({
                            setMax: false,
                            fillValue: true,
                            amount: tokenData
                                ? new BigNumber(tokenData.balance || '0')
                                      .dividedBy(4)
                                      .toFixed(tokenData.decimals)
                                : new BigNumber(account.formattedBalance)
                                      .dividedBy(4)
                                      .toFixed(network.decimals),
                        });
                    }}
                >
                    1/4
                </Button>
            </Left>
            <TokenBalance>
                {tokenData && (
                    <TokenBalanceValue>
                        <Translation id="TOKEN_BALANCE" values={{ balance: tokenData.balance }} />
                        {tokenData.symbol ? ` ${tokenData.symbol.toUpperCase()}` : ''}
                    </TokenBalanceValue>
                )}
            </TokenBalance>
        </Wrapper>
    );
};

export default Bottom;
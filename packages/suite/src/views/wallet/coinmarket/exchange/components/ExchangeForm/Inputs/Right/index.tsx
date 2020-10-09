import { Icon, variables, Select } from '@trezor/components';
import React from 'react';
import { Controller } from 'react-hook-form';
import styled from 'styled-components';
import { useCoinmarketExchangeFormContext } from '@suite/hooks/wallet/useCoinmarketExchangeForm';
import { Translation } from '@suite/components/suite';
import {
    getBuyCryptoOptions,
    getSellCryptoOptions,
} from '@suite/utils/wallet/coinmarket/exchangeUtils';

const Wrapper = styled.div`
    display: flex;
    flex: 1;
    min-width: 160px;

    @media screen and (max-width: ${variables.SCREEN_SIZE.LG}) {
        flex-direction: column;
    }
`;

const StyledIcon = styled(Icon)`
    @media screen and (max-width: ${variables.SCREEN_SIZE.LG}) {
        transform: rotate(90deg);
    }
`;

const Inputs = () => {
    const {
        trigger,
        control,
        formState,
        amountLimits,
        setAmountLimits,
        account,
        exchangeInfo,
    } = useCoinmarketExchangeFormContext();
    const sellCryptoSelect = 'sellCryptoSelect';

    return (
        <Wrapper>
            <Controller
                control={control}
                name={sellCryptoSelect}
                render={({ onChange, value }) => {
                    return (
                        <Select
                            onChange={(selected: any) => {
                                onChange(selected);
                                setAmountLimits(undefined);
                            }}
                            noTopLabel
                            value={value}
                            isClearable={false}
                            options={getBuyCryptoOptions(account, exchangeInfo)}
                            minWidth="70px"
                        />
                    );
                }}
            />
        </Wrapper>
    );
};

export default Inputs;

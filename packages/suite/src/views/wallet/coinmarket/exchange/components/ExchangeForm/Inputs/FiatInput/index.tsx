import { Input } from '@trezor/components';
import React from 'react';
import styled from 'styled-components';
import { InputError } from '@wallet-components';
import { isDecimalsValid } from '@wallet-utils/validation';
import { useCoinmarketExchangeFormContext } from '@suite/hooks/wallet/useCoinmarketExchangeForm';
import { Translation } from '@suite/components/suite';
import FiatSelect from './FiatSelect';

const StyledInput = styled(Input)`
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
`;

const FiatInput = () => {
    const {
        register,
        network,
        clearErrors,
        errors,
        trigger,
        formState,
        updateBuyCryptoValue,
        setMax,
        setValue,
    } = useCoinmarketExchangeFormContext();
    const fiatInput = 'fiatInput';

    return (
        <StyledInput
            onFocus={() => {
                trigger([fiatInput]);
            }}
            onChange={event => {
                setMax(false);
                if (errors[fiatInput]) {
                    setValue('buyCryptoInput', '');
                } else {
                    updateBuyCryptoValue(event.target.value, network.decimals);
                    clearErrors(fiatInput);
                }
            }}
            state={errors[fiatInput] ? 'error' : undefined}
            name={fiatInput}
            noTopLabel
            innerRef={register({
                validate: value => {
                    if (!value) {
                        if (formState.isSubmitting) {
                            return <Translation id="TR_EXCHANGE_VALIDATION_ERROR_EMPTY" />;
                        }

                        if (value.isNaN()) {
                            return 'AMOUNT_IS_NOT_NUMBER';
                        }
                    }

                    if (!isDecimalsValid(value, 18)) {
                        return <Translation id="TR_EXCHANGE_VALIDATION_ERROR_NOT_NUMBER" />;
                    }
                },
            })}
            bottomText={<InputError error={errors[fiatInput]} />}
            innerAddon={<FiatSelect />}
        />
    );
};

export default FiatInput;

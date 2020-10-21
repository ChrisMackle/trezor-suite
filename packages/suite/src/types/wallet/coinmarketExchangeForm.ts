import { AppState } from '@suite-types';
import { UseFormMethods } from 'react-hook-form';
import { Account, Network, CoinFiatRates } from '@wallet-types';
import { FeeLevel } from 'trezor-connect';
import { ExchangeTrade, ExchangeTradeQuoteRequest, ExchangeCoinInfo } from 'invity-api';
import { ExchangeInfo } from '@wallet-actions/coinmarketExchangeActions';
import { TypedValidationRules } from './form';
import { FeeInfo, PrecomposedTransactionFinal } from '@wallet-types/sendForm';

export type Option = { value: string; label: string };
export type defaultCountryOption = { value: string; label?: string };

export interface ComponentProps {
    selectedAccount: AppState['wallet']['selectedAccount'];
    fiat: AppState['wallet']['fiat'];
    device: AppState['suite']['device'];
    localCurrency: AppState['wallet']['settings']['localCurrency'];
    fees: AppState['wallet']['fees'];
    quotesRequest: AppState['wallet']['coinmarket']['exchange']['quotesRequest'];
    exchangeCoinInfo: AppState['wallet']['coinmarket']['exchange']['exchangeCoinInfo'];
}

export interface Props extends ComponentProps {
    selectedAccount: Extract<ComponentProps['selectedAccount'], { status: 'loaded' }>;
}

export type FormState = {
    buyCryptoInput?: string;
    buyCryptoSelect: Option;
    fiatInput?: string;
    fiatSelect?: Option;
    sellCryptoSelect: Option;
    feePerUnit?: string;
};

export interface AmountLimits {
    currency: string;
    min?: number;
    max?: number;
}

export interface ComposeData {
    activeMaxLimit?: number;
    address?: string;
    feeLevelLabel?: FeeLevel['label'];
    feePerUnit?: FeeLevel['feePerUnit'];
    feeLimit?: FeeLevel['feeLimit'];
    token?: string;
}

export type ExchangeFormContextValues = Omit<UseFormMethods<FormState>, 'register'> & {
    register: (rules?: TypedValidationRules) => (ref: any) => void;
    onSubmit: () => void;
    account: Account;
    isComposing: boolean;
    exchangeInfo?: ExchangeInfo;
    exchangeCoinInfo?: ExchangeCoinInfo[];
    localCurrencyOption: { label: string; value: string };
    selectedFee: FeeLevel['label'];
    setActiveMaxLimit: (activeMaxLimit: number | undefined) => void;
    activeMaxLimit?: number;
    compose: (data: ComposeData) => void;
    selectFee: (feeLevel: FeeLevel['label']) => void;
    updateFiatCurrency: (selectedCurrency: { value: string; label: string }) => void;
    updateBuyCryptoValue: (fiatValue: string, decimals: number) => void;
    saveQuoteRequest: (request: ExchangeTradeQuoteRequest) => Promise<void>;
    saveQuotes: (fixedQuotes: ExchangeTrade[], floatQuotes: ExchangeTrade[]) => Promise<void>;
    saveTrade: (exchangeTrade: ExchangeTrade, account: Account, date: string) => Promise<void>;
    amountLimits?: AmountLimits;
    transactionInfo: PrecomposedTransactionFinal | null;
    setTransactionInfo: (transactionInfo: PrecomposedTransactionFinal) => void;
    token: string | undefined;
    setToken: (token: string | undefined) => void;
    fiatRates?: CoinFiatRates;
    setAmountLimits: (limits?: AmountLimits) => void;
    quotesRequest: AppState['wallet']['coinmarket']['exchange']['quotesRequest'];
    isLoading: boolean;
    updateFiatValue: (amount: string) => void;
    noProviders: boolean;
    network: Network;
    feeInfo: FeeInfo;
};
import { AppState } from '@suite-types';
import { Account } from '@wallet-types';
import { ExchangeTrade } from 'invity-api';
import { ExchangeInfo } from '@suite/actions/wallet/coinmarketExchangeActions';

export interface ComponentProps {
    selectedAccount: AppState['wallet']['selectedAccount'];
    device: AppState['suite']['device'];
    fixedQuotes: AppState['wallet']['coinmarket']['exchange']['fixedQuotes'];
    floatQuotes: AppState['wallet']['coinmarket']['exchange']['floatQuotes'];
    quotesRequest: AppState['wallet']['coinmarket']['exchange']['quotesRequest'];
    addressVerified: AppState['wallet']['coinmarket']['exchange']['addressVerified'];
    exchangeInfo?: ExchangeInfo;
}

export interface Props extends ComponentProps {
    selectedAccount: Extract<AppState['wallet']['selectedAccount'], { status: 'loaded' }>;
}

export type ExchangeStep = 'RECEIVING_ADDRESS' | 'SEND_TRANSACTION';

export type ContextValues = {
    account: Account;
    fixedQuotes: AppState['wallet']['coinmarket']['exchange']['fixedQuotes'];
    floatQuotes: AppState['wallet']['coinmarket']['exchange']['floatQuotes'];
    quotesRequest: AppState['wallet']['coinmarket']['exchange']['quotesRequest'];
    lastFetchDate: Date;
    REFETCH_INTERVAL: number;
    device: AppState['suite']['device'];
    selectedQuote?: ExchangeTrade;
    suiteBuyAccounts?: AppState['wallet']['accounts'];
    addressVerified: AppState['wallet']['coinmarket']['exchange']['addressVerified'];
    exchangeInfo?: ExchangeInfo;
    exchangeStep: ExchangeStep;
    setExchangeStep: (step: ExchangeStep) => void;
    selectQuote: (quote: ExchangeTrade) => void;
    verifyAddress: (path: string, address: string) => Promise<void>;
    saveTrade: (exchangeTrade: ExchangeTrade, account: Account, date: string) => Promise<void>;
    doTrade: (address: string) => void;
};

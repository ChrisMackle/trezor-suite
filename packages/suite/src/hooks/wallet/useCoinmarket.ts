import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { BuyTradeStatus, ExchangeTradeStatus } from 'invity-api';
import { useUnmount, useTimeoutFn } from 'react-use';
import invityAPI from '@suite-services/invityAPI';
import * as coinmarketBuyActions from '@wallet-actions/coinmarketBuyActions';
import { Account } from '@wallet-types';
import { useActions } from '@suite-hooks';
import { TradeBuy, TradeExchange } from '@wallet-reducers/coinmarketReducer';
import { AppState } from '@suite-types';
import { loadBuyInfo } from '@wallet-actions/coinmarketBuyActions';
import * as coinmarketExchangeActions from '@wallet-actions/coinmarketExchangeActions';

export const useInvityAPI = () => {
    const selectedAccount = useSelector<AppState, AppState['wallet']['selectedAccount']>(
        state => state.wallet.selectedAccount,
    );

    const buyInfo = useSelector<AppState, AppState['wallet']['coinmarket']['buy']['buyInfo']>(
        state => state.wallet.coinmarket.buy.buyInfo,
    );

    const exchangeInfo = useSelector<
        AppState,
        AppState['wallet']['coinmarket']['exchange']['exchangeInfo']
    >(state => state.wallet.coinmarket.exchange.exchangeInfo);

    const exchangeCoinInfo = useSelector<
        AppState,
        AppState['wallet']['coinmarket']['exchange']['exchangeCoinInfo']
    >(state => state.wallet.coinmarket.exchange.exchangeCoinInfo);

    const invityAPIUrl = useSelector<
        AppState,
        AppState['suite']['settings']['debug']['invityAPIUrl']
    >(state => state.suite.settings.debug.invityAPIUrl);

    const { saveBuyInfo } = useActions({ saveBuyInfo: coinmarketBuyActions.saveBuyInfo });
    const { saveExchangeInfo, saveExchangeCoinInfo } = useActions({
        saveExchangeInfo: coinmarketExchangeActions.saveExchangeInfo,
        saveExchangeCoinInfo: coinmarketExchangeActions.saveExchangeCoinInfo,
    });

    if (selectedAccount.status === 'loaded') {
        if (invityAPIUrl) {
            invityAPI.setInvityAPIServer(invityAPIUrl);
        }

        invityAPI.createInvityAPIKey(selectedAccount.account?.descriptor);

        if (!buyInfo?.buyInfo) {
            loadBuyInfo().then(buyInfo => {
                saveBuyInfo(buyInfo);
            });
        }

        if (!exchangeInfo) {
            coinmarketExchangeActions
                .loadExchangeInfo()
                .then(([exchangeInfo, exchangeCoinInfo]) => {
                    saveExchangeInfo(exchangeInfo);
                    saveExchangeCoinInfo(exchangeCoinInfo);
                });
        }
    }

    return {
        buyInfo,
        exchangeInfo,
        exchangeCoinInfo,
    };
};

const BuyTradeFinalStatuses: BuyTradeStatus[] = ['SUCCESS', 'ERROR', 'BLOCKED'];

const shouldRefreshBuyTrade = (trade?: TradeBuy) => {
    return trade && trade.data.status && !BuyTradeFinalStatuses.includes(trade.data.status);
};

export const useWatchBuyTrade = (account: Account, trade: TradeBuy) => {
    const REFRESH_SECONDS = 30;
    const [updatedTrade, setUpdatedTrade] = useState<TradeBuy | undefined>(trade);
    const { saveTrade } = useActions({ saveTrade: coinmarketBuyActions.saveTrade });
    const [refreshCount, setRefreshCount] = useState(0);
    const invokeRefresh = () => {
        if (shouldRefreshBuyTrade(trade)) {
            setRefreshCount(prevValue => prevValue + 1);
        }
    };
    const [, cancelRefresh, resetRefresh] = useTimeoutFn(invokeRefresh, REFRESH_SECONDS * 1000);

    useUnmount(() => {
        cancelRefresh();
    });

    useEffect(() => {
        if (trade && shouldRefreshBuyTrade(trade)) {
            cancelRefresh();
            invityAPI.createInvityAPIKey(account.descriptor);
            invityAPI.watchBuyTrade(trade.data, refreshCount).then(response => {
                if (response.status && response.status !== trade.data.status) {
                    const newDate = new Date().toISOString();
                    const tradeData = {
                        ...trade.data,
                        status: response.status,
                        error: response.error,
                    };
                    saveTrade(tradeData, account, newDate);
                    setUpdatedTrade({
                        tradeType: 'buy',
                        key: trade.data.paymentId,
                        date: newDate,
                        data: tradeData,
                        account: {
                            descriptor: account.descriptor,
                            symbol: account.symbol,
                            accountType: account.accountType,
                            accountIndex: account.index,
                        },
                    });
                }
            });
            resetRefresh();
        }
    }, [account, cancelRefresh, refreshCount, resetRefresh, saveTrade, trade]);

    return updatedTrade;
};

export const ExchangeTradeFinalStatuses: ExchangeTradeStatus[] = ['SUCCESS', 'ERROR', 'KYC'];

const shouldRefreshExchangeTrade = (trade?: TradeExchange) => {
    return trade && trade.data.status && !ExchangeTradeFinalStatuses.includes(trade.data.status);
};

export const useWatchExchangeTrade = (account: Account, trade: TradeExchange) => {
    const REFRESH_SECONDS = 30;
    const [updatedTrade, setUpdatedTrade] = useState<TradeExchange | undefined>(trade);
    const { saveTrade } = useActions({ saveTrade: coinmarketExchangeActions.saveTrade });
    const [refreshCount, setRefreshCount] = useState(0);
    const invokeRefresh = () => {
        if (shouldRefreshExchangeTrade(trade)) {
            setRefreshCount(prevValue => prevValue + 1);
        }
    };
    const [, cancelRefresh, resetRefresh] = useTimeoutFn(invokeRefresh, REFRESH_SECONDS * 1000);

    useUnmount(() => {
        cancelRefresh();
    });

    useEffect(() => {
        if (trade && shouldRefreshExchangeTrade(trade)) {
            cancelRefresh();
            invityAPI.createInvityAPIKey(account.descriptor);
            invityAPI.watchExchangeTrade(trade.data, refreshCount).then(response => {
                if (response.status && response.status !== trade.data.status) {
                    const newDate = new Date().toISOString();
                    const tradeData = {
                        ...trade.data,
                        status: response.status,
                        error: response.error,
                    };
                    saveTrade(tradeData, account, newDate);
                    setUpdatedTrade({
                        tradeType: 'exchange',
                        key: trade.data.orderId,
                        date: newDate,
                        data: tradeData,
                        account: {
                            descriptor: account.descriptor,
                            symbol: account.symbol,
                            accountType: account.accountType,
                            accountIndex: account.index,
                        },
                    });
                }
            });
            resetRefresh();
        }
    }, [account, cancelRefresh, refreshCount, resetRefresh, saveTrade, trade]);

    return updatedTrade;
};

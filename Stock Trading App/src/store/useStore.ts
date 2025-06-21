import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, Stock, PortfolioStock, Transaction } from '../types';
import { mockStocks } from '../data/mockStocks';

interface StoreActions {
  setStocks: (stocks: Stock[]) => void;
  setSelectedStock: (stock: Stock | null) => void;
  setSearchQuery: (query: string) => void;
  setActiveTab: (tab: AppState['activeTab']) => void;
  setLoading: (loading: boolean) => void;
  addToWatchlist: (symbol: string) => void;
  removeFromWatchlist: (symbol: string) => void;
  buyStock: (symbol: string, shares: number, price: number) => void;
  sellStock: (symbol: string, shares: number, price: number) => void;
  updatePortfolio: () => void;
}

export const useStore = create<AppState & StoreActions>()(
  persist(
    (set, get) => ({
      stocks: mockStocks,
      portfolio: [],
      watchlist: [],
      transactions: [],
      selectedStock: null,
      searchQuery: '',
      activeTab: 'market',
      loading: false,

      setStocks: (stocks) => set({ stocks }),
      setSelectedStock: (selectedStock) => set({ selectedStock }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setActiveTab: (activeTab) => set({ activeTab }),
      setLoading: (loading) => set({ loading }),

      addToWatchlist: (symbol) =>
        set((state) => ({
          watchlist: state.watchlist.includes(symbol)
            ? state.watchlist
            : [...state.watchlist, symbol]
        })),

      removeFromWatchlist: (symbol) =>
        set((state) => ({
          watchlist: state.watchlist.filter((s) => s !== symbol)
        })),

      buyStock: (symbol, shares, price) => {
        const state = get();
        const existingStock = state.portfolio.find((s) => s.symbol === symbol);
        const total = shares * price;

        const transaction: Transaction = {
          id: Date.now().toString(),
          symbol,
          type: 'buy',
          shares,
          price,
          total,
          date: new Date().toISOString()
        };

        if (existingStock) {
          const newShares = existingStock.shares + shares;
          const newTotalInvested = existingStock.totalInvested + total;
          const newAvgPrice = newTotalInvested / newShares;

          set((state) => ({
            portfolio: state.portfolio.map((stock) =>
              stock.symbol === symbol
                ? {
                    ...stock,
                    shares: newShares,
                    avgPrice: newAvgPrice,
                    totalInvested: newTotalInvested
                  }
                : stock
            ),
            transactions: [...state.transactions, transaction]
          }));
        } else {
          const newStock: PortfolioStock = {
            symbol,
            shares,
            avgPrice: price,
            totalInvested: total,
            currentValue: 0,
            gainLoss: 0,
            gainLossPercent: 0
          };

          set((state) => ({
            portfolio: [...state.portfolio, newStock],
            transactions: [...state.transactions, transaction]
          }));
        }

        get().updatePortfolio();
      },

      sellStock: (symbol, shares, price) => {
        const state = get();
        const existingStock = state.portfolio.find((s) => s.symbol === symbol);
        
        if (!existingStock || existingStock.shares < shares) return;

        const total = shares * price;
        const transaction: Transaction = {
          id: Date.now().toString(),
          symbol,
          type: 'sell',
          shares,
          price,
          total,
          date: new Date().toISOString()
        };

        const newShares = existingStock.shares - shares;
        const soldPortion = shares / existingStock.shares;
        const newTotalInvested = existingStock.totalInvested * (1 - soldPortion);

        if (newShares === 0) {
          set((state) => ({
            portfolio: state.portfolio.filter((stock) => stock.symbol !== symbol),
            transactions: [...state.transactions, transaction]
          }));
        } else {
          set((state) => ({
            portfolio: state.portfolio.map((stock) =>
              stock.symbol === symbol
                ? {
                    ...stock,
                    shares: newShares,
                    totalInvested: newTotalInvested
                  }
                : stock
            ),
            transactions: [...state.transactions, transaction]
          }));
        }

        get().updatePortfolio();
      },

      updatePortfolio: () => {
        const { portfolio, stocks } = get();
        
        const updatedPortfolio = portfolio.map((portfolioStock) => {
          const currentStock = stocks.find((s) => s.symbol === portfolioStock.symbol);
          if (!currentStock) return portfolioStock;

          const currentValue = portfolioStock.shares * currentStock.price;
          const gainLoss = currentValue - portfolioStock.totalInvested;
          const gainLossPercent = (gainLoss / portfolioStock.totalInvested) * 100;

          return {
            ...portfolioStock,
            currentValue,
            gainLoss,
            gainLossPercent
          };
        });

        set({ portfolio: updatedPortfolio });
      }
    }),
    {
      name: 'stock-trading-storage',
      partialize: (state) => ({
        portfolio: state.portfolio,
        watchlist: state.watchlist,
        transactions: state.transactions
      })
    }
  )
);
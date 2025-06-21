export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  sector: string;
}

export interface HistoricalData {
  date: string;
  price: number;
  volume: number;
}

export interface PortfolioStock {
  symbol: string;
  shares: number;
  avgPrice: number;
  totalInvested: number;
  currentValue: number;
  gainLoss: number;
  gainLossPercent: number;
}

export interface Transaction {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  shares: number;
  price: number;
  total: number;
  date: string;
}

export interface AppState {
  stocks: Stock[];
  portfolio: PortfolioStock[];
  watchlist: string[];
  transactions: Transaction[];
  selectedStock: Stock | null;
  searchQuery: string;
  activeTab: 'market' | 'portfolio' | 'watchlist' | 'history';
  loading: boolean;
}
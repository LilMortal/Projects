import { Stock, HistoricalData } from '../types';

export const mockStocks: Stock[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 178.85,
    change: 2.45,
    changePercent: 1.39,
    volume: 45234567,
    marketCap: 2834000000000,
    high: 180.12,
    low: 176.33,
    open: 177.20,
    previousClose: 176.40,
    sector: 'Technology'
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 134.56,
    change: -1.23,
    changePercent: -0.91,
    volume: 23456789,
    marketCap: 1698000000000,
    high: 136.78,
    low: 133.45,
    open: 135.67,
    previousClose: 135.79,
    sector: 'Technology'
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 378.92,
    change: 4.56,
    changePercent: 1.22,
    volume: 34567890,
    marketCap: 2812000000000,
    high: 380.45,
    low: 374.23,
    open: 375.67,
    previousClose: 374.36,
    sector: 'Technology'
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 145.78,
    change: -0.89,
    changePercent: -0.61,
    volume: 45678901,
    marketCap: 1511000000000,
    high: 147.23,
    low: 144.56,
    open: 146.34,
    previousClose: 146.67,
    sector: 'Consumer Discretionary'
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: 234.56,
    change: 8.92,
    changePercent: 3.96,
    volume: 78901234,
    marketCap: 743000000000,
    high: 238.90,
    low: 229.45,
    open: 231.23,
    previousClose: 225.64,
    sector: 'Consumer Discretionary'
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 478.23,
    change: 12.34,
    changePercent: 2.65,
    volume: 56789012,
    marketCap: 1180000000000,
    high: 482.67,
    low: 465.89,
    open: 467.45,
    previousClose: 465.89,
    sector: 'Technology'
  },
  {
    symbol: 'META',
    name: 'Meta Platforms Inc.',
    price: 312.45,
    change: -3.67,
    changePercent: -1.16,
    volume: 34567812,
    marketCap: 834000000000,
    high: 318.90,
    low: 310.23,
    open: 316.78,
    previousClose: 316.12,
    sector: 'Communication Services'
  },
  {
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    price: 165.89,
    change: 1.23,
    changePercent: 0.75,
    volume: 23456781,
    marketCap: 487000000000,
    high: 167.45,
    low: 163.78,
    open: 164.56,
    previousClose: 164.66,
    sector: 'Financials'
  }
];

export const generateHistoricalData = (symbol: string, days: number = 30): HistoricalData[] => {
  const data: HistoricalData[] = [];
  const stock = mockStocks.find(s => s.symbol === symbol);
  const basePrice = stock?.price || 100;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Generate realistic price fluctuation
    const volatility = 0.02; // 2% daily volatility
    const randomChange = (Math.random() - 0.5) * 2 * volatility;
    const price = basePrice * (1 + randomChange * (i / days));
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: Math.round(price * 100) / 100,
      volume: Math.floor(Math.random() * 50000000) + 10000000
    });
  }
  
  return data;
};
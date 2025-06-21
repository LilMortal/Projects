const GIPHY_API_KEY = 'GlVGYHkr3WSBnllca54iNt0yFbjz7L65'; // Demo API key
const GIPHY_BASE_URL = 'https://api.giphy.com/v1/gifs';

export interface GiphyApiParams {
  q?: string;
  limit?: number;
  offset?: number;
  rating?: string;
}

export const giphyApi = {
  // Search GIFs
  searchGifs: async (params: GiphyApiParams) => {
    const searchParams = new URLSearchParams({
      api_key: GIPHY_API_KEY,
      limit: (params.limit || 25).toString(),
      offset: (params.offset || 0).toString(),
      rating: params.rating || 'g',
      lang: 'en',
    });

    if (params.q) {
      searchParams.append('q', params.q);
    }

    const endpoint = params.q ? 'search' : 'trending';
    const response = await fetch(`${GIPHY_BASE_URL}/${endpoint}?${searchParams}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch GIFs');
    }
    
    return response.json();
  },

  // Get trending GIFs
  getTrendingGifs: async (params: Omit<GiphyApiParams, 'q'> = {}) => {
    return giphyApi.searchGifs(params);
  },

  // Download GIF
  downloadGif: async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${filename}.gif`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Download failed:', error);
      throw new Error('Failed to download GIF');
    }
  },
};
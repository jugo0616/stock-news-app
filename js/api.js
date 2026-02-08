// ===========================
// API Integration Module
// ===========================

class NewsAPIService {
    constructor() {
        // Initialize with default API keys if not set
        const defaultKeys = {
            newsApiKey: '5a11df5e9a0f4e51bdc970415ff02757',
            alphaVantageKey: 'JN1JQXCGIDSN5DEH',
            finnhubKey: 'd646n39r01ql6dj2d2rgd646n39r01ql6dj2d2s0'
        };

        // Load from localStorage or use defaults
        this.newsApiKey = localStorage.getItem('newsApiKey') || defaultKeys.newsApiKey;
        this.alphaVantageKey = localStorage.getItem('alphaVantageKey') || defaultKeys.alphaVantageKey;
        this.finnhubKey = localStorage.getItem('finnhubKey') || defaultKeys.finnhubKey;

        // Save defaults to localStorage if not already saved
        if (!localStorage.getItem('newsApiKey')) {
            this.saveKeys(this.newsApiKey, this.alphaVantageKey, this.finnhubKey);
        }
    }

    // Save API keys to localStorage
    saveKeys(newsApi, alphaVantage, finnhub) {
        this.newsApiKey = newsApi;
        this.alphaVantageKey = alphaVantage;
        this.finnhubKey = finnhub;

        localStorage.setItem('newsApiKey', newsApi);
        localStorage.setItem('alphaVantageKey', alphaVantage);
        localStorage.setItem('finnhubKey', finnhub);
    }

    // Clear all API keys
    clearKeys() {
        this.newsApiKey = '';
        this.alphaVantageKey = '';
        this.finnhubKey = '';

        localStorage.removeItem('newsApiKey');
        localStorage.removeItem('alphaVantageKey');
        localStorage.removeItem('finnhubKey');
    }

    // Check if any API key is configured
    hasAnyKey() {
        return !!(this.newsApiKey || this.alphaVantageKey || this.finnhubKey);
    }

    // Fetch US market news from NewsAPI
    async fetchUSNews(sector = null, query = null) {
        if (!this.newsApiKey) {
            console.warn('NewsAPI 키가 없습니다.');
            return null; // Return null to use sample data
        }

        try {
            let url = `https://newsapi.org/v2/everything?`;

            if (query) {
                url += `q=${encodeURIComponent(query)}&`;
            } else if (sector) {
                const sectorKeywords = this.getSectorKeywords('us', sector);
                url += `q=${encodeURIComponent(sectorKeywords)}&`;
            } else {
                url += `q=stock OR market OR nasdaq OR "wall street"&`;
            }

            url += `language=en&sortBy=publishedAt&pageSize=20&apiKey=${this.newsApiKey}`;

            console.log('📞 NewsAPI 호출:', url.replace(this.newsApiKey, '***'));
            const response = await fetch(url);
            const data = await response.json();

            console.log('📥 NewsAPI 응답:', {
                status: data.status,
                totalResults: data.totalResults,
                articles: data.articles?.length || 0
            });

            if (data.status === 'ok' && data.articles) {
                return this.formatNewsAPIResponse(data.articles, sector);
            } else if (data.status === 'error') {
                console.error('❌ NewsAPI 에러:', data.message);
            }

            return null;
        } catch (error) {
            console.error('❌ NewsAPI fetch error:', error);
            return null;
        }
    }

    // Fetch news from Finnhub
    async fetchFinnhubNews(symbol = 'AAPL') {
        if (!this.finnhubKey) {
            return null;
        }

        try {
            const url = `https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${this.getDateDaysAgo(7)}&to=${this.getToday()}&token=${this.finnhubKey}`;

            const response = await fetch(url);
            const data = await response.json();

            if (data && Array.isArray(data)) {
                return this.formatFinnhubResponse(data);
            }

            return null;
        } catch (error) {
            console.error('Finnhub fetch error:', error);
            return null;
        }
    }

    // Fetch Korean market news (using NewsAPI with Korean sources)
    async fetchKRNews(sector = null) {
        if (!this.newsApiKey) {
            return null;
        }

        try {
            let query = '삼성 OR 현대 OR LG OR SK';
            if (sector) {
                const sectorKeywords = this.getSectorKeywords('kr', sector);
                query = sectorKeywords;
            }

            const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=ko&sortBy=publishedAt&pageSize=20&apiKey=${this.newsApiKey}`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.status === 'ok' && data.articles) {
                return this.formatNewsAPIResponse(data.articles, sector, true);
            }

            return null;
        } catch (error) {
            console.error('Korean news fetch error:', error);
            return null;
        }
    }

    // Fetch crypto news
    async fetchCryptoNews() {
        if (!this.newsApiKey) {
            return null;
        }

        try {
            const url = `https://newsapi.org/v2/everything?q=bitcoin OR cryptocurrency OR ethereum OR crypto&language=en&sortBy=publishedAt&pageSize=20&apiKey=${this.newsApiKey}`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.status === 'ok' && data.articles) {
                return this.formatNewsAPIResponse(data.articles, 'bitcoin');
            }

            return null;
        } catch (error) {
            console.error('Crypto news fetch error:', error);
            return null;
        }
    }

    // Get sector-specific keywords
    getSectorKeywords(market, sectorId) {
        const keywords = {
            us: {
                ai: 'artificial intelligence OR AI OR OpenAI OR ChatGPT',
                tech: 'technology OR Apple OR Google OR Microsoft',
                semiconductor: 'semiconductor OR chip OR TSMC OR NVIDIA',
                cloud: 'cloud computing OR AWS OR Azure',
                ev: 'electric vehicle OR EV OR Tesla',
                biotech: 'biotech OR pharmaceutical OR drug',
                fintech: 'fintech OR payment OR PayPal',
                energy: 'energy OR oil OR renewable',
                retail: 'retail OR Amazon OR e-commerce',
                healthcare: 'healthcare OR medical'
            },
            kr: {
                semiconductor: '삼성전자 OR SK하이닉스 OR 반도체',
                battery: 'LG에너지솔루션 OR 배터리 OR 2차전지',
                display: 'LG디스플레이 OR 삼성디스플레이 OR OLED',
                auto: '현대차 OR 기아 OR 자동차',
                bio: '삼성바이오 OR 셀트리온 OR 바이오',
                shipbuilding: '한국조선 OR 조선 OR 선박',
                chemical: 'LG화학 OR 화학',
                steel: '포스코 OR 철강',
                entertainment: 'HYBE OR SM OR JYP OR K-pop',
                retail: '네이버 OR 쿠팡 OR 이커머스'
            }
        };

        return keywords[market]?.[sectorId] || '';
    }

    // Format NewsAPI response
    formatNewsAPIResponse(articles, sector, isKorean = false) {
        return articles.slice(0, 10).map((article, index) => ({
            id: Date.now() + index,
            sector: sector || 'general',
            title: isKorean ? article.title : this.translateToKorean(article.title),
            summary: isKorean ? (article.description || '') : this.translateToKorean(article.description || ''),
            source: article.source.name,
            time: this.getRelativeTime(article.publishedAt),
            url: article.url
        }));
    }

    // Format Finnhub response
    formatFinnhubResponse(articles) {
        return articles.slice(0, 10).map((article, index) => ({
            id: Date.now() + index,
            sector: 'general',
            title: this.translateToKorean(article.headline),
            summary: this.translateToKorean(article.summary),
            source: article.source,
            time: this.getRelativeTime(new Date(article.datetime * 1000).toISOString()),
            url: article.url
        }));
    }

    // Simple translation placeholder (in real app, use Google Translate API or similar)
    translateToKorean(text) {
        // This is a placeholder. In production, integrate with a translation API
        // For now, return original text with a note
        return text; // Keep English for now - can integrate Google Translate API later
    }

    // Get relative time string
    getRelativeTime(dateString) {
        const now = new Date();
        const date = new Date(dateString);
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) {
            return `${diffMins}분 전`;
        } else if (diffHours < 24) {
            return `${diffHours}시간 전`;
        } else {
            return `${diffDays}일 전`;
        }
    }

    // Helper: Get date N days ago
    getDateDaysAgo(days) {
        const date = new Date();
        date.setDate(date.getDate() - days);
        return date.toISOString().split('T')[0];
    }

    // Helper: Get today's date
    getToday() {
        return new Date().toISOString().split('T')[0];
    }

    // Analyze sentiment and categorize into sectors (basic implementation)
    analyzeSectors(articles) {
        const sectorCounts = {};
        const sectorKeywords = {
            ai: ['ai', 'artificial intelligence', 'openai', 'chatgpt', 'machine learning'],
            tech: ['apple', 'google', 'microsoft', 'technology', 'software'],
            semiconductor: ['semiconductor', 'chip', 'tsmc', 'nvidia', 'intel'],
            ev: ['tesla', 'electric vehicle', 'ev', 'automotive'],
            biotech: ['biotech', 'pharmaceutical', 'drug', 'medicine'],
            fintech: ['fintech', 'payment', 'paypal', 'banking'],
            energy: ['energy', 'oil', 'renewable', 'solar'],
            cloud: ['cloud', 'aws', 'azure', 'data center']
        };

        articles.forEach(article => {
            const text = (article.title + ' ' + article.description).toLowerCase();

            Object.keys(sectorKeywords).forEach(sector => {
                const keywords = sectorKeywords[sector];
                const matches = keywords.filter(keyword => text.includes(keyword));

                if (matches.length > 0) {
                    sectorCounts[sector] = (sectorCounts[sector] || 0) + matches.length;
                }
            });
        });

        // Convert to sorted array
        return Object.entries(sectorCounts)
            .map(([sector, count]) => ({
                id: sector,
                interest: Math.min(100, count * 10),
                change: Math.floor(Math.random() * 20) - 5 // Random for demo
            }))
            .sort((a, b) => b.interest - a.interest);
    }
}

// Export for use in app.js
window.NewsAPIService = NewsAPIService;

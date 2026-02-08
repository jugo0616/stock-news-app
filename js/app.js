// ===========================
// Main Application Logic
// ===========================

class StockNewsApp {
    constructor() {
        this.currentMarket = 'us';
        this.currentSector = null;
        this.currentData = SAMPLE_DATA;
        this.apiService = new NewsAPIService();
        this.searchTimeout = null;
        this.isAdminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';

        // Admin credentials (in production, this should be server-side)
        this.ADMIN_ID = 'gngkgngk11';
        this.ADMIN_PW = 'c06160520';

        // Auto-update settings
        this.autoUpdateInterval = null;
        this.updateIntervalMinutes = 5; // 5분마다 업데이트
        this.lastUpdateTime = null;

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadMarket('us');
        this.initChart();
        this.loadAPIKeys();
        this.updateAuthUI();

        // Force fetch real news with API keys
        console.log('🔑 API 키 확인:', {
            newsApi: this.apiService.newsApiKey ? '설정됨' : '없음',
            alphaVantage: this.apiService.alphaVantageKey ? '설정됨' : '없음',
            finnhub: this.apiService.finnhubKey ? '설정됨' : '없음'
        });

        // Always try to fetch real news
        console.log('📡 실시간 뉴스 로딩 시작...');
        this.fetchRealNews();

        // Start auto-update timer
        this.startAutoUpdate();
    }

    setupEventListeners() {
        // Market tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const market = e.target.dataset.market;
                this.switchMarket(market);
            });
        });

        // Search input
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => {
                this.handleSearch(e.target.value);
            }, 500);
        });

        // Settings modal
        const settingsBtn = document.getElementById('settingsBtn');
        const settingsModal = document.getElementById('settingsModal');
        const modalClose = document.getElementById('modalClose');
        const modalOverlay = document.getElementById('modalOverlay');
        const saveBtn = document.getElementById('saveApiKeys');
        const clearBtn = document.getElementById('clearApiKeys');

        settingsBtn.addEventListener('click', () => {
            settingsModal.classList.remove('hidden');
        });

        modalClose.addEventListener('click', () => {
            settingsModal.classList.add('hidden');
        });

        modalOverlay.addEventListener('click', () => {
            settingsModal.classList.add('hidden');
        });

        saveBtn.addEventListener('click', () => {
            this.saveAPIKeys();
        });

        clearBtn.addEventListener('click', () => {
            this.clearAPIKeys();
        });

        // Login modal
        const loginBtn = document.getElementById('loginBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const loginModal = document.getElementById('loginModal');
        const loginClose = document.getElementById('loginClose');
        const loginOverlay = document.getElementById('loginOverlay');
        const loginSubmitBtn = document.getElementById('loginSubmitBtn');
        const loginCancelBtn = document.getElementById('loginCancelBtn');
        const adminPwInput = document.getElementById('adminPw');

        loginBtn.addEventListener('click', () => {
            loginModal.classList.remove('hidden');
            document.getElementById('loginError').classList.add('hidden');
            document.getElementById('adminId').value = '';
            document.getElementById('adminPw').value = '';
        });

        logoutBtn.addEventListener('click', () => {
            this.logout();
        });

        loginClose.addEventListener('click', () => {
            loginModal.classList.add('hidden');
        });

        loginOverlay.addEventListener('click', () => {
            loginModal.classList.add('hidden');
        });

        loginCancelBtn.addEventListener('click', () => {
            loginModal.classList.add('hidden');
        });

        loginSubmitBtn.addEventListener('click', () => {
            this.handleLogin();
        });

        // Enter key in password field
        adminPwInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleLogin();
            }
        });

        // News detail modal
        const newsDetailModal = document.getElementById('newsDetailModal');
        const newsDetailClose = document.getElementById('newsDetailClose');
        const newsDetailOverlay = document.getElementById('newsDetailOverlay');

        newsDetailClose.addEventListener('click', () => {
            newsDetailModal.classList.add('hidden');
        });

        newsDetailOverlay.addEventListener('click', () => {
            newsDetailModal.classList.add('hidden');
        });
    }

    switchMarket(market) {
        this.currentMarket = market;
        this.currentSector = null;

        // Update tab UI
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.market === market) {
                btn.classList.add('active');
            }
        });

        this.loadMarket(market);

        // Try to fetch real data
        if (this.apiService.hasAnyKey()) {
            this.fetchRealNews();
        }
    }

    loadMarket(market) {
        const data = this.currentData[market];

        if (!data) {
            console.error('Market data not found:', market);
            return;
        }

        this.renderSectors(data.sectors);
        this.renderNews(data.news);
        updateChart(data.sectors, market);

        // Update section title
        const marketNames = {
            us: '🇺🇸 미국 시장',
            kr: '🇰🇷 한국 시장',
            crypto: '₿ 비트코인'
        };
        document.getElementById('newsSectionTitle').textContent =
            `📰 ${marketNames[market]} 최신 뉴스`;
    }

    renderSectors(sectors) {
        const sectorList = document.getElementById('sectorList');
        sectorList.innerHTML = '';

        sectors.forEach((sector, index) => {
            const li = document.createElement('li');
            li.className = 'sector-item';
            li.dataset.sectorId = sector.id;

            const changeClass = sector.change >= 0 ? 'positive' : 'negative';
            const changeSymbol = sector.change >= 0 ? '▲' : '▼';

            li.innerHTML = `
        <div class="sector-header">
          <span class="sector-rank">${index + 1}</span>
          <span class="sector-name">${sector.name}</span>
        </div>
        <div class="sector-info">
          <span class="interest-score">${sector.interest}</span>
          <span class="sector-change ${changeClass}">
            ${changeSymbol} ${Math.abs(sector.change)}%
          </span>
        </div>
      `;

            li.addEventListener('click', () => {
                this.filterBySector(sector.id);
            });

            sectorList.appendChild(li);
        });
    }

    renderNews(newsItems) {
        const newsGrid = document.getElementById('newsGrid');
        const emptyState = document.getElementById('emptyState');

        newsGrid.innerHTML = '';

        if (newsItems.length === 0) {
            newsGrid.classList.add('hidden');
            emptyState.classList.remove('hidden');
            return;
        }

        newsGrid.classList.remove('hidden');
        emptyState.classList.add('hidden');

        newsItems.forEach(news => {
            const card = this.createNewsCard(news);
            newsGrid.appendChild(card);
        });
    }

    createNewsCard(news) {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.style.cursor = 'pointer'; // 클릭 가능 표시

        // 뉴스 카드 클릭 시 상세 모달 열기
        card.addEventListener('click', () => {
            this.showNewsDetail(news);
        });

        // Get sector name
        const marketData = this.currentData[this.currentMarket];
        const sectorObj = marketData.sectors.find(s => s.id === news.sector);
        const sectorName = sectorObj ? sectorObj.name : news.sector;

        const sectorTag = document.createElement('span');
        sectorTag.className = 'news-sector-tag'; // Changed to news-sector-tag to match original CSS
        sectorTag.textContent = sectorName; // Use resolved sectorName

        const title = document.createElement('h3');
        title.className = 'news-title';
        title.textContent = news.title;

        const summary = document.createElement('p');
        summary.className = 'news-summary';
        summary.textContent = news.summary;

        const meta = document.createElement('div');
        meta.className = 'news-footer'; // Changed to news-footer to match original CSS

        const source = document.createElement('span');
        source.className = 'news-source';
        source.textContent = news.source;

        const time = document.createElement('span');
        time.className = 'news-time';
        time.textContent = news.time;

        const link = document.createElement('a');
        link.className = 'read-more'; // Changed to read-more to match original CSS
        link.href = news.url;
        link.textContent = '자세히 보기 →';
        link.target = '_blank';

        // 링크 클릭 시 이벤트 전파 중지 (카드 클릭 방지)
        link.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Reconstruct the structure to match the original template as closely as possible
        const header = document.createElement('div');
        header.className = 'news-header';
        header.appendChild(sectorTag);
        header.appendChild(time);

        meta.appendChild(source);
        meta.appendChild(link);

        card.appendChild(header);
        card.appendChild(title);
        card.appendChild(summary);
        card.appendChild(meta);

        return card;
    }

    filterBySector(sectorId) {
        this.currentSector = sectorId;

        // Update sector UI
        document.querySelectorAll('.sector-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.sectorId === sectorId) {
                item.classList.add('active');
            }
        });

        // Filter news
        const marketData = this.currentData[this.currentMarket];
        const filteredNews = marketData.news.filter(news => news.sector === sectorId);
        this.renderNews(filteredNews);
    }

    handleSearch(query) {
        if (!query.trim()) {
            // Reset to show all news
            this.currentSector = null;
            document.querySelectorAll('.sector-item').forEach(item => {
                item.classList.remove('active');
            });
            const marketData = this.currentData[this.currentMarket];
            this.renderNews(marketData.news);
            return;
        }

        const upperQuery = query.toUpperCase();

        // Check if it's a stock ticker
        const stockInfo = STOCK_TICKERS[upperQuery];
        if (stockInfo) {
            // Switch to the appropriate market
            if (stockInfo.market !== this.currentMarket) {
                this.switchMarket(stockInfo.market);
            }
            // Filter by sector
            setTimeout(() => {
                this.filterBySector(stockInfo.sector);
            }, 100);
            return;
        }

        // Search in news titles and summaries
        const marketData = this.currentData[this.currentMarket];
        const searchResults = marketData.news.filter(news => {
            return news.title.toLowerCase().includes(query.toLowerCase()) ||
                news.summary.toLowerCase().includes(query.toLowerCase());
        });
        this.renderNews(searchResults);
    }

    async fetchRealNews() {
        console.log('📡 실시간 뉴스 가져오기 시작 - 현재 시장:', this.currentMarket);
        console.log('🔑 사용 중인 API 키:', {
            NewsAPI: this.apiService.newsApiKey ? `${this.apiService.newsApiKey.substring(0, 8)}...` : '없음',
            AlphaVantage: this.apiService.alphaVantageKey ? `${this.apiService.alphaVantageKey.substring(0, 8)}...` : '없음',
            Finnhub: this.apiService.finnhubKey ? `${this.apiService.finnhubKey.substring(0, 8)}...` : '없음'
        });

        let newsData = null;

        try {
            switch (this.currentMarket) {
                case 'us':
                    console.log('🇺🇸 미국 뉴스 API 호출 중...');
                    newsData = await this.apiService.fetchUSNews();
                    break;
                case 'kr':
                    console.log('🇰🇷 한국 뉴스 API 호출 중...');
                    newsData = await this.apiService.fetchKRNews();
                    break;
                case 'crypto':
                    console.log('₿ 암호화폐 뉴스 API 호출 중...');
                    newsData = await this.apiService.fetchCryptoNews();
                    break;
            }

            if (newsData && newsData.length > 0) {
                console.log('✅ 실시간 뉴스 로드 성공:', newsData.length, '개 기사');
                console.log('첫 번째 뉴스:', newsData[0].title);

                // Update current data with real news
                this.currentData[this.currentMarket].news = newsData;

                // Re-render if still on the same market
                if (!this.currentSector) {
                    this.renderNews(newsData);
                }
            } else {
                console.warn('⚠️ API에서 뉴스를 받아오지 못했습니다. 샘플 데이터를 사용합니다.');
                console.log('API 응답:', newsData);
            }
        } catch (error) {
            console.error('❌ 뉴스 API 호출 중 에러 발생:', error);
            console.log('샘플 데이터를 계속 사용합니다.');
        }
    }
    loadAPIKeys() {
        const newsApiKey = localStorage.getItem('newsApiKey') || '';
        const alphaVantageKey = localStorage.getItem('alphaVantageKey') || '';
        const finnhubKey = localStorage.getItem('finnhubKey') || '';

        document.getElementById('newsApiKey').value = newsApiKey;
        document.getElementById('alphaVantageKey').value = alphaVantageKey;
        document.getElementById('finnhubKey').value = finnhubKey;
    }

    saveAPIKeys() {
        const newsApiKey = document.getElementById('newsApiKey').value.trim();
        const alphaVantageKey = document.getElementById('alphaVantageKey').value.trim();
        const finnhubKey = document.getElementById('finnhubKey').value.trim();

        this.apiService.saveKeys(newsApiKey, alphaVantageKey, finnhubKey);

        // Close modal
        document.getElementById('settingsModal').classList.add('hidden');

        // Show success message
        alert('API 키가 저장되었습니다. 실시간 뉴스를 가져옵니다...');

        // Fetch real news
        this.fetchRealNews();
    }

    clearAPIKeys() {
        if (confirm('모든 API 키를 삭제하시겠습니까?')) {
            this.apiService.clearKeys();

            document.getElementById('newsApiKey').value = '';
            document.getElementById('alphaVantageKey').value = '';
            document.getElementById('finnhubKey').value = '';

            alert('API 키가 삭제되었습니다. 샘플 데이터를 사용합니다.');
        }
    }

    handleLogin() {
        const inputId = document.getElementById('adminId').value.trim();
        const inputPw = document.getElementById('adminPw').value;
        const loginError = document.getElementById('loginError');

        if (inputId === this.ADMIN_ID && inputPw === this.ADMIN_PW) {
            // Login successful
            this.isAdminLoggedIn = true;
            localStorage.setItem('adminLoggedIn', 'true');
            document.getElementById('loginModal').classList.add('hidden');
            this.updateAuthUI();

            // Clear input fields
            document.getElementById('adminId').value = '';
            document.getElementById('adminPw').value = '';
        } else {
            // Login failed
            loginError.classList.remove('hidden');
        }
    }

    logout() {
        if (confirm('로그아웃 하시겠습니까?')) {
            this.isAdminLoggedIn = false;
            localStorage.removeItem('adminLoggedIn');
            this.updateAuthUI();
        }
    }

    updateAuthUI() {
        const loginBtn = document.getElementById('loginBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const settingsBtn = document.getElementById('settingsBtn');

        if (this.isAdminLoggedIn) {
            // Admin logged in
            loginBtn.classList.add('hidden');
            logoutBtn.classList.remove('hidden');
            settingsBtn.classList.remove('hidden');
        } else {
            // Not logged in
            loginBtn.classList.remove('hidden');
            logoutBtn.classList.add('hidden');
            settingsBtn.classList.add('hidden');
        }
    }

    async showNewsDetail(news) {
        console.log('📰 뉴스 상세 표시:', news.title);

        const modal = document.getElementById('newsDetailModal');
        const marketData = this.currentData[this.currentMarket];
        const sectorObj = marketData.sectors.find(s => s.id === news.sector);
        const sectorName = sectorObj ? sectorObj.name : news.sector;

        // 제목과 요약 번역
        const translatedTitle = await this.translateToKorean(news.title);
        const translatedSummary = await this.translateToKorean(news.summary);

        // 모달 내용 채우기
        document.getElementById('newsDetailSector').textContent = sectorName;
        document.getElementById('newsDetailTime').textContent = news.time;
        document.getElementById('newsDetailSource').textContent = news.source;
        document.getElementById('newsDetailHeadline').textContent = translatedTitle;
        document.getElementById('newsDetailSummary').textContent = translatedSummary;
        document.getElementById('newsOriginalBtn').href = news.url;

        // 모달 표시
        modal.classList.remove('hidden');
    }

    async translateToKorean(text) {
        // Google Translate API를 사용한 번역 (무료 제한 있음)
        // 실제 프로덕션에서는 서버 사이드에서 처리하거나 유료 API 사용 권장

        if (!text || text.trim() === '') {
            return text;
        }

        try {
            // MyMemory Translation API (무료, 제한 있음)
            const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|ko`;

            console.log('🌐 번역 중:', text.substring(0, 50) + '...');

            const response = await fetch(url);
            const data = await response.json();

            if (data.responseStatus === 200 && data.responseData.translatedText) {
                console.log('✅ 번역 완료');
                return data.responseData.translatedText;
            } else {
                console.warn('⚠️ 번역 실패, 원문 사용');
                return text;
            }
        } catch (error) {
            console.error('❌ 번역 오류:', error);
            return text; // 번역 실패 시 원문 반환
        }
    }

    startAutoUpdate() {
        if (this.autoUpdateInterval) {
            clearInterval(this.autoUpdateInterval);
        }

        console.log(`⏰ 자동 업데이트 시작: ${this.updateIntervalMinutes}분마다 갱신`);
        this.lastUpdateTime = new Date();

        // Set interval to update news
        this.autoUpdateInterval = setInterval(() => {
            console.log('🔄 자동 뉴스 업데이트 중...');
            this.lastUpdateTime = new Date();
            this.fetchRealNews();
        }, this.updateIntervalMinutes * 60 * 1000); // Convert minutes to milliseconds
    }

    stopAutoUpdate() {
        if (this.autoUpdateInterval) {
            clearInterval(this.autoUpdateInterval);
            this.autoUpdateInterval = null;
            console.log('⏹️ 자동 업데이트 중지됨');
        }
    }

    getTimeSinceLastUpdate() {
        if (!this.lastUpdateTime) {
            return '업데이트 대기 중';
        }

        const now = new Date();
        const diffMs = now - this.lastUpdateTime;
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 1) {
            return '방금 전';
        } else if (diffMins < 60) {
            return `${diffMins}분 전`;
        } else {
            const diffHours = Math.floor(diffMins / 60);
            return `${diffHours}시간 전`;
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new StockNewsApp();
});

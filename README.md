# Stock News Sector Analysis

실시간 미국, 한국, 비트코인 뉴스 섹터 분석 웹사이트

## 🌟 Features

- 📈 미국, 한국, 비트코인 시장 뉴스 분석
- 🔝 섹터별 관심도 Top 10 순위
- 📊 인터랙티브 차트 (Chart.js)
- 🔍 주식 티커/회사명 검색
- 🌐 자동 한글 번역
- 🔐 관리자 페이지 (API 관리)
- ⏰ 5분마다 자동 뉴스 업데이트

## 🚀 Demo

https://YOUR_USERNAME.github.io/stock-news-app

## 📱 Screenshots

![Main Page](screenshots/main.png)
![News Detail](screenshots/detail.png)

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Charts**: Chart.js
- **APIs**: 
  - NewsAPI.org
  - Alpha Vantage
  - Finnhub
  - MyMemory Translation API

## 🔧 Setup

1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/stock-news-app.git
cd stock-news-app
```

2. Open `index.html` in your browser
```bash
# Or use a local server
python -m http.server 8000
# Then visit http://localhost:8000
```

3. (Optional) Add your own API keys
- Click the login button (ID: gngkgngk11, PW: c06160520)
- Click the settings icon ⚙️
- Enter your API keys

## 📝 API Keys

Get free API keys from:
- [NewsAPI](https://newsapi.org/register)
- [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
- [Finnhub](https://finnhub.io/dashboard)

## 🎨 Features in Detail

### Real-time News Updates
- Automatically fetches new articles every 5 minutes
- Visual indicators for update status
- Manual refresh available

### Auto Translation
- English news automatically translated to Korean
- Powered by MyMemory Translation API
- Falls back to original text if translation fails

### Admin Panel
- Secure login system
- API key management
- LocalStorage persistence

## 📄 License

MIT License - feel free to use this project!

## 👨‍💻 Author

Created with ❤️ by [Your Name]

## 🙏 Acknowledgments

- NewsAPI for news data
- Chart.js for beautiful charts
- MyMemory for translation services

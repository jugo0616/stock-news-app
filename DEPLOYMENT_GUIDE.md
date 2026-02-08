# 주식 뉴스 웹사이트 배포 가이드

## 🌐 GitHub Pages로 무료 배포하기

### 1단계: GitHub 저장소 생성

1. **GitHub 계정 로그인**
   - https://github.com 접속
   - 계정이 없다면 무료로 가입

2. **새 저장소 만들기**
   ```
   - 우측 상단 "+" → "New repository" 클릭
   - Repository name: stock-news-app (원하는 이름)
   - Public 선택 (GitHub Pages는 Public 필요)
   - "Create repository" 클릭
   ```

### 2단계: 코드 업로드

#### 방법 A: GitHub 웹사이트에서 직접 업로드

1. **파일 업로드**
   ```
   - "uploading an existing file" 클릭
   - 아래 폴더/파일 전체 드래그 앤 드롭:
     ├── index.html
     ├── README.md
     ├── css/
     │   └── style.css
     └── js/
         ├── data.js
         ├── api.js
         ├── charts.js
         └── app.js
   ```

2. **Commit**
   ```
   - Commit message: "Initial commit"
   - "Commit changes" 클릭
   ```

#### 방법 B: Git 명령어 사용 (터미널)

```bash
# 1. 프로젝트 폴더로 이동
cd f:\Antigravity\주식\stock-news-app

# 2. Git 초기화
git init

# 3. 모든 파일 추가
git add .

# 4. 커밋
git commit -m "Initial commit"

# 5. GitHub 저장소 연결 (YOUR_USERNAME을 본인 아이디로 변경)
git remote add origin https://github.com/YOUR_USERNAME/stock-news-app.git

# 6. 업로드
git branch -M main
git push -u origin main
```

### 3단계: GitHub Pages 활성화

1. **Settings 접속**
   ```
   - 저장소 페이지에서 "Settings" 탭 클릭
   ```

2. **Pages 설정**
   ```
   - 좌측 메뉴에서 "Pages" 클릭
   - Source: "Deploy from a branch" 선택
   - Branch: "main" 선택, 폴더: "/ (root)" 선택
   - "Save" 클릭
   ```

3. **배포 완료 대기**
   ```
   - 1-2분 후 자동으로 배포됨
   - 페이지 새로고침 시 상단에 URL 표시:
     "Your site is published at https://YOUR_USERNAME.github.io/stock-news-app/"
   ```

---

## ✅ 배포 확인

### 웹사이트 접속
```
https://YOUR_USERNAME.github.io/stock-news-app/
```

### 테스트 체크리스트
- [ ] 페이지가 정상적으로 로드됨
- [ ] 뉴스가 표시됨 (API 키 자동 적용)
- [ ] 시장 탭 전환 작동
- [ ] 뉴스 클릭 시 상세 모달 표시
- [ ] 번역 기능 작동
- [ ] 로그인 기능 작동

---

## 🔧 문제 해결

### API가 작동하지 않는 경우

**원인**: CORS (Cross-Origin Resource Sharing) 정책

**해결방법**:

#### 옵션 1: 백엔드 프록시 서버 구축 (권장)
```javascript
// Node.js + Express 예시
app.get('/api/news', async (req, res) => {
  const response = await fetch(`https://newsapi.org/v2/everything?...`);
  const data = await response.json();
  res.json(data);
});
```

#### 옵션 2: Netlify Functions 사용
```javascript
// netlify/functions/news.js
exports.handler = async function(event, context) {
  const response = await fetch('https://newsapi.org/v2/...');
  return {
    statusCode: 200,
    body: JSON.stringify(await response.json())
  };
};
```

#### 옵션 3: Vercel Serverless Functions
```javascript
// api/news.js
export default async function handler(req, res) {
  const data = await fetch('https://newsapi.org/v2/...');
  res.json(await data.json());
}
```

### CSS/JS 파일이 로드되지 않는 경우

**파일 경로 확인**:
```html
<!-- 절대 경로 사용 (권장) -->
<link rel="stylesheet" href="/stock-news-app/css/style.css">
<script src="/stock-news-app/js/app.js"></script>

<!-- 또는 상대 경로 -->
<link rel="stylesheet" href="css/style.css">
<script src="js/app.js"></script>
```

---

## 🚀 다른 배포 옵션

### Netlify (더 쉬움, 권장)

1. **Netlify 가입**
   - https://www.netlify.com 접속
   - GitHub 계정으로 로그인

2. **사이트 배포**
   ```
   - "Import from Git" 클릭
   - GitHub 저장소 선택
   - "Deploy site" 클릭
   ```

3. **URL 받기**
   ```
   - 자동 생성: https://random-name-12345.netlify.app
   - 커스텀: https://stock-news.netlify.app (설정 가능)
   ```

**장점**:
- ✅ HTTPS 자동 적용
- ✅ 커스텀 도메인 무료
- ✅ 서버리스 함수 지원 (CORS 해결)
- ✅ 자동 빌드/배포

### Vercel

```bash
# 1. Vercel CLI 설치
npm i -g vercel

# 2. 프로젝트 폴더에서 실행
cd f:\Antigravity\주식\stock-news-app
vercel

# 3. 질문에 답변
# - Set up and deploy? Y
# - Which scope? (본인 계정 선택)
# - Link to existing project? N
# - What's your project's name? stock-news-app
# - In which directory is your code located? ./
```

**배포 완료!**
```
https://stock-news-app.vercel.app
```

### Cloudflare Pages

1. **Cloudflare 계정 생성**
   - https://pages.cloudflare.com

2. **프로젝트 연결**
   ```
   - "Create a project" 클릭
   - GitHub 연결
   - 저장소 선택
   - "Save and Deploy" 클릭
   ```

3. **URL**
   ```
   https://stock-news-app.pages.dev
   ```

---

## 📱 커스텀 도메인 연결 (선택)

### 1. 도메인 구매
```
- Namecheap: ~$10/년
- GoDaddy: ~$12/년
- 가비아: ~₩15,000/년
```

### 2. GitHub Pages에 연결
```
1. Settings → Pages → Custom domain
2. 도메인 입력: stocknews.com
3. DNS 설정:
   - Type: A
   - Name: @
   - Value: 185.199.108.153
   
4. CNAME 레코드:
   - Type: CNAME
   - Name: www
   - Value: YOUR_USERNAME.github.io
```

### 3. HTTPS 활성화
```
Settings → Pages → "Enforce HTTPS" 체크
```

---

## 📊 배포 현황 모니터링

### GitHub Pages
```
- Settings → Pages에서 배포 상태 확인
- Actions 탭에서 빌드 로그 확인
```

### Analytics 추가 (선택)

#### Google Analytics
```html
<!-- index.html의 </head> 전에 추가 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🔄 업데이트 방법

### Git 사용
```bash
# 1. 파일 수정 후
git add .
git commit -m "Update features"
git push

# 2. 자동으로 GitHub Pages에 재배포됨 (1-2분 소요)
```

### GitHub 웹사이트
```
1. 수정할 파일 클릭
2. 연필 아이콘 (Edit) 클릭
3. 내용 수정
4. "Commit changes" 클릭
5. 자동 재배포
```

---

## ✅ 최종 체크리스트

배포 전 확인사항:
- [ ] README.md 파일 작성
- [ ] 불필요한 파일 제거 (.git, node_modules 등)
- [ ] API 키가 코드에 하드코딩되어 있지 않은지 확인
- [ ] 모든 경로가 상대 경로인지 확인
- [ ] 모바일 반응형 테스트

배포 후 확인사항:
- [ ] 웹사이트 접속 가능
- [ ] 모든 기능 작동
- [ ] HTTPS 적용 (자물쇠 아이콘)
- [ ] 모바일/데스크탑에서 테스트

---

## 🎉 완료!

이제 누구나 다음 주소로 웹사이트에 접근할 수 있습니다:

```
https://YOUR_USERNAME.github.io/stock-news-app/
```

링크를 친구들과 공유하세요! 🚀

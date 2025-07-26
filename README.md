# Trip Service Backend

여행 서비스를 위한 Node.js 백엔드 API입니다.

## 🚀 기술 스택

### Backend
- **Node.js** - JavaScript 런타임
- **Express.js** - 웹 프레임워크
- **PostgreSQL** - 관계형 데이터베이스
- **Sequelize** - PostgreSQL ORM
- **Redis** - 인메모리 캐시 (채팅, 세션, 실시간 데이터)
- **Elasticsearch** - 검색 엔진
- **Socket.IO** - 실시간 통신
- **JWT** - 인증 토큰
- **bcryptjs** - 비밀번호 암호화

### Frontend (Next.js)
- **React** - UI 라이브러리
- **Next.js** - React 프레임워크
- **TypeScript** - 타입 안전성
- **Redux** - 상태 관리
- **CSS** - 스타일링

### 외부 서비스
- **Google Maps / Kakao Maps** - 지도 서비스
- **AWS S3** - 파일 저장소
- **Puppeteer** - PDF 생성
- **html2canvas** - 이미지 변환

## 📋 요구사항

- Node.js 18.0.0 이상
- PostgreSQL 12.0 이상
- Redis 6.0 이상
- Elasticsearch 7.0 이상

## 🛠️ 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`env.example` 파일을 복사하여 `.env` 파일을 생성하고 필요한 값들을 설정하세요:

```bash
cp env.example .env
```

### 3. 데이터베이스 설정

```bash
# PostgreSQL 데이터베이스 생성
createdb trip_service

# Redis 서버 시작
redis-server

# Elasticsearch 서버 시작 (Docker 사용 권장)
docker run -d --name elasticsearch -p 9200:9200 -e "discovery.type=single-node" elasticsearch:7.17.0
```

### 4. 개발 서버 실행

```bash
# 개발 모드 (nodemon 사용)
npm run dev

# 프로덕션 모드
npm start
```

서버는 기본적으로 `http://localhost:3000`에서 실행됩니다.

## 📚 API 엔드포인트

### 인증

- `POST /api/users/register` - 사용자 등록
- `POST /api/users/login` - 사용자 로그인
- `GET /api/users/profile` - 사용자 프로필 조회 (인증 필요)

### 여행 관리

- `GET /api/trips` - 사용자의 모든 여행 조회 (인증 필요)
- `GET /api/trips/:id` - 특정 여행 조회 (인증 필요)
- `POST /api/trips` - 새 여행 생성 (인증 필요)
- `PUT /api/trips/:id` - 여행 수정 (인증 필요)
- `DELETE /api/trips/:id` - 여행 삭제 (인증 필요)

### 채팅

- `GET /api/chat/history/:roomId` - 채팅 기록 조회 (인증 필요)
- `POST /api/chat/send` - 메시지 전송 (인증 필요)
- `PUT /api/chat/read/:messageId` - 메시지 읽음 처리 (인증 필요)

### 알림

- `GET /api/notifications` - 알림 목록 조회 (인증 필요)
- `PUT /api/notifications/read/:id` - 알림 읽음 처리 (인증 필요)
- `DELETE /api/notifications/:id` - 알림 삭제 (인증 필요)

### 검색

- `GET /api/search/trips` - 여행 검색 (인증 필요)
- `GET /api/search/users` - 사용자 검색 (인증 필요)
- `GET /api/search/global` - 전체 검색 (인증 필요)

### 파일 업로드

- `POST /api/upload/image` - 이미지 업로드 (인증 필요)
- `POST /api/upload/file` - 파일 업로드 (인증 필요)
- `POST /api/upload/pdf` - PDF 생성 (인증 필요)
- `DELETE /api/upload/:filename` - 파일 삭제 (인증 필요)

### 헬스 체크

- `GET /health` - 서버 상태 확인

## 🔐 인증

API는 JWT 토큰을 사용한 인증을 지원합니다. 보호된 엔드포인트에 접근하려면 요청 헤더에 다음을 포함해야 합니다:

```
Authorization: Bearer <your-jwt-token>
```

## 📁 프로젝트 구조

```
src/
├── config/
│   ├── database.js          # PostgreSQL 연결 설정
│   ├── redis.js             # Redis 연결 설정
│   └── elasticsearch.js     # Elasticsearch 연결 설정
├── controllers/
│   ├── userController.js    # 사용자 관련 컨트롤러
│   ├── tripController.js    # 여행 관련 컨트롤러
│   ├── chatController.js    # 채팅 관련 컨트롤러
│   ├── notificationController.js # 알림 관련 컨트롤러
│   ├── searchController.js  # 검색 관련 컨트롤러
│   └── uploadController.js  # 파일 업로드 컨트롤러
├── middleware/
│   ├── auth.js              # JWT 인증 미들웨어
│   ├── errorHandler.js      # 에러 처리 미들웨어
│   └── notFound.js          # 404 에러 처리
├── models/
│   ├── User.js              # 사용자 모델
│   ├── Trip.js              # 여행 모델
│   ├── Chat.js              # 채팅 모델
│   └── Notification.js      # 알림 모델
├── routes/
│   ├── userRoutes.js        # 사용자 라우터
│   ├── tripRoutes.js        # 여행 라우터
│   ├── chatRoutes.js        # 채팅 라우터
│   ├── notificationRoutes.js # 알림 라우터
│   ├── searchRoutes.js      # 검색 라우터
│   └── uploadRoutes.js      # 파일 업로드 라우터
├── services/
│   ├── emailService.js      # 이메일 서비스
│   ├── fileService.js       # 파일 처리 서비스
│   └── mapService.js        # 지도 서비스
└── app.js                   # 메인 애플리케이션 파일
```

## 🧪 테스트

```bash
npm test
```

## 📝 라이선스

MIT License 
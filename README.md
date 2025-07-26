# Trip Service Backend

여행 서비스를 위한 Node.js 백엔드 API입니다.

## 🚀 기술 스택

- **Node.js** - JavaScript 런타임
- **Express.js** - 웹 프레임워크
- **MongoDB** - NoSQL 데이터베이스
- **Mongoose** - MongoDB ODM
- **JWT** - 인증 토큰
- **bcryptjs** - 비밀번호 암호화
- **Helmet** - 보안 미들웨어
- **CORS** - Cross-Origin Resource Sharing
- **Morgan** - HTTP 요청 로깅

## 📋 요구사항

- Node.js 18.0.0 이상
- MongoDB (로컬 또는 클라우드)

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

### 3. 개발 서버 실행

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
│   └── database.js          # 데이터베이스 연결 설정
├── controllers/
│   ├── userController.js    # 사용자 관련 컨트롤러
│   └── tripController.js    # 여행 관련 컨트롤러
├── middleware/
│   ├── auth.js              # JWT 인증 미들웨어
│   ├── errorHandler.js      # 에러 처리 미들웨어
│   └── notFound.js          # 404 에러 처리
├── models/
│   ├── User.js              # 사용자 모델
│   └── Trip.js              # 여행 모델
├── routes/
│   ├── userRoutes.js        # 사용자 라우터
│   └── tripRoutes.js        # 여행 라우터
└── app.js                   # 메인 애플리케이션 파일
```

## 🧪 테스트

```bash
npm test
```

## 📝 라이선스

MIT License 
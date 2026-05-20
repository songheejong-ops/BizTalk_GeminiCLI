# GEMINI.md - 업무 말투 변환기 (Business Tone Converter)

본 프로젝트는 사용자가 입력한 내용을 수신 대상(상사, 동료, 고객 등)에 맞는 적절한 업무용 말투로 변환해주는 서비스입니다.

---

## 🚀 프로젝트 개요 (Project Overview)

- **목적**: 비즈니스 커뮤니케이션의 효율성을 높이고, 상황에 맞는 정중한 표현 작성을 돕는 AI 서비스.
- **주요 기능**:
  - 원문 텍스트 입력 및 수신 대상 선택.
  - LLM(Upstage Solar-Pro2)을 활용한 말투 변환.
  - 변환 결과 출력 및 클립보드 복사.
- **기술 스택**:
  - **Backend**: Python (FastAPI), LangChain, langchain-upstage.
  - **Frontend**: HTML5, CSS3, JavaScript (Vanilla ES6+).
  - **AI Model**: Upstage Solar-Pro2.
  - **Deployment**: Vercel.

---

## 📜 개발 원칙 (Vibe Coding 3원칙)

작업 시 다음 원칙을 반드시 준수합니다:

1. **원칙 1: 완료 기준을 먼저 정의하라**
   - 구현 전 "체크리스트"를 명확히 하고, 해당 범위 내에서만 작업합니다.
2. **원칙 2: 조사 먼저, 구현 나중**
   - 라이브러리나 API 연동 전 공식 문서나 최신 사용법을 먼저 확인합니다.
3. **원칙 3: 버그는 분석 먼저, 수정 나중**
   - 오류 발생 시 원인을 먼저 분석하고 사용자에게 설명한 뒤 수정을 진행합니다.

---

## 📁 디렉토리 구조 (Directory Structure)

```text
biztone-converter/
├── backend/                # FastAPI 서버 및 비즈니스 로직
│   ├── main.py             # 앱 진입점 및 CORS 설정
│   ├── routers/            # API 라우터 (convert.py)
│   ├── services/           # AI 변환 로직 (tone_converter.py)
│   ├── prompts/            # 프롬프트 템플릿 (templates.py)
│   ├── models/             # 데이터 스키마 (schemas.py)
│   └── requirements.txt    # 의존성 목록
├── frontend/               # 프론트엔드 정적 파일
│   ├── index.html          # 메인 화면
│   ├── css/                # 스타일시트
│   └── js/                 # 클라이언트 로직 (app.js)
├── .env                    # API 키 (UPSTAGE_API_KEY)
├── .gitignore              # Git 제외 파일 설정
└── README.md               # 프로젝트 설명서
```

---

## 🛠️ 빌드 및 실행 가이드 (Building and Running)

### 사전 요구 사항
- Python 3.11 이상
- Upstage API Key (로그인 필요)

### 백엔드 설정 및 실행
```bash
# 의존성 설치
pip install fastapi uvicorn langchain langchain-upstage python-dotenv pydantic

# 서버 실행
cd backend
uvicorn main:app --reload --port 8000
```

### 프론트엔드 실행
- `frontend/index.html` 파일을 브라우저에서 직접 열거나, VS Code Live Server 등을 사용합니다.

---

## 🎯 개발 컨벤션 및 주의사항

- **환경 변수**: API 키는 반드시 `.env` 파일에서 관리하며, 절대 GitHub에 노출하지 않습니다.
- **CORS**: 프론트엔드와 백엔드 간의 통신을 위해 `CORSMiddleware` 설정이 필요합니다.
- **프롬프트 전략**: 수신 대상(`boss`, `colleague`, `client`, `team`)에 따라 최적화된 시스템 프롬프트를 사용합니다.

---

## 📝 TODO (주요 구현 단계)

- [ ] STEP 1: 프로젝트 디렉토리 구조 생성 및 환경 설정.
- [ ] STEP 2: FastAPI 백엔드 엔드포인트 및 AI 변환 로직 구현.
- [ ] STEP 3: Vanilla JS 프론트엔드 화면 구성 및 API 연동.
- [ ] STEP 4: Vercel 배포 및 최종 동작 확인.



### Source Code가 변경되거나 라이브러리 버전이 변경되면 반드시 @PRD_업무말투변환기.md 문서도 반드시 같이 업데이트 합니다. 
* 구현이 완료된 사항들은 '2. 완료 체크리스트'에 모두 체크표시를 해서 완료되었음을 표시하세요.
* '8. 단계별 구현 순서'의 STEP1 ~ STEP4에 완료가 되면 체크표시를 해서 완료되었음을 표시하세요.
* 라이브러리 버전이 변경되면 '@PRD_업무말투변환기.md 문서', 'GEMINI.md' 업데이트 하세요
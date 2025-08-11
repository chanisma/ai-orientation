# AI 기초 수업 발표자료 모음

이 프로젝트는 '인공지능 기초' 수업의 발표 자료들을 모아놓은 웹사이트입니다. 학생들은 이 사이트를 통해 각 주제에 대한 발표 자료를 쉽게 열람할 수 있습니다.

## ✨ 주요 기술 스택

- **Framework**: React
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router

## 📂 프로젝트 구조

주요 소스 코드는 `src` 폴더 안에 다음과 같은 구조로 정리되어 있습니다.

- `src/components`: 여러 페이지에서 재사용되는 공통 컴포넌트
- `src/data`: 발표 자료의 메타데이터(제목, 설명, 경로 등)를 관리하는 곳
- `src/pages`: 각 개별 페이지를 구성하는 컴포넌트 (랜딩 페이지, 발표 자료 페이지 등)
- `src/App.tsx`: 전체 애플리케이션의 라우팅을 관리
- `src/main.tsx`: 애플리케이션의 최상위 진입점

## 🚀 시작하기

1.  **의존성 설치:**
    ```bash
    npm install
    ```

2.  **개발 서버 실행:**
    ```bash
    npm run dev
    ```
    서버가 실행되면 브라우저에서 `http://localhost:5173` 주소로 접속하세요.

## 📝 새로운 발표 자료 추가하기

새로운 발표 자료를 웹사이트에 추가하는 과정은 다음과 같습니다.

1.  **데이터 추가:**
    `src/data/presentations.ts` 파일의 `presentations` 배열에 새로운 발표 자료 정보를 객체 형태로 추가합니다.

    ```ts
    // 예시
    {
      id: 'new-topic', // 고유한 ID
      title: '새로운 발표 주제',
      description: '이 발표는 ...에 대해 다룹니다.',
      path: '/presentation/new-topic', // 페이지 경로
    }
    ```

2.  **페이지 컴포넌트 생성:**
    `src/pages` 폴더에 새로운 발표 자료에 해당하는 React 컴포넌트 파일(예: `NewTopicPage.tsx`)을 생성합니다.

3.  **라우팅 설정:**
    `src/App.tsx` 파일에 새로 만든 페이지 컴포넌트를 위한 라우트를 추가합니다.

    ```tsx
    import NewTopicPage from './pages/NewTopicPage';

    function App() {
      return (
        <Routes>
          {/* ... 기존 라우트 ... */}
          <Route path="/presentation/new-topic" element={<NewTopicPage />} />
        </Routes>
      );
    }
    ```

---
*이 README 파일은 Gemini와 함께 업데이트되었습니다.*
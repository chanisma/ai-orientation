// MergedAIJobsWebPage.tsx
import React, { useMemo, useState } from "react";

type Company = {
  company: string;
  sector: string;
  role: string;
  highlights: string[];
  skills: string[];
  majors: string[];
  link: string;
  group: "core" | "nonAI";
  source?: string;
  region?: string;
};

const companies: Company[] = [
  // ── AI 중심(학생들이 잘 아는 기업) ───────────────────────────
  {
    company: "Samsung Electronics",
    sector: "전자/디바이스",
    role: "LLM SW Development Lead",
    highlights: [
      "대규모언어모델(LLM) 기반 SW 개발/최적화",
      "프롬프트/파인튜닝 및 성능 고도화",
    ],
    skills: ["Python", "C/C++", "LLM", "MLOps"],
    majors: ["컴퓨터공학", "전자/전기", "수학/통계"],
    link: "https://sec.wd3.myworkdayjobs.com/en-US/Samsung_Careers/job/LLM-SW-Development-Lead_R106403/apply",
    group: "core",
  },
  {
    company: "KakaoBank",
    sector: "금융/핀테크",
    role: "AI Research Engineer (LLM/RAG, STT/TTS)",
    highlights: [
      "서비스 적용을 위한 LLM 개발",
      "Semantic Search with RAG, STT/TTS",
    ],
    skills: ["Python", "LLM", "RAG", "STT/TTS"],
    majors: ["컴퓨터공학", "데이터과학", "전자/전기", "수학/통계"],
    link: "https://recruit.kakaobank.com/jobs/205682",
    group: "core",
  },
  {
    company: "NCSOFT",
    sector: "게임/엔터",
    role: "AI Researcher (LLM/VLM 응용)",
    highlights: [
      "오픈소스 LLM 적용/튜닝",
      "멀티모달(VLM) 응용 연구",
    ],
    skills: ["Python", "PyTorch", "LLM", "VLM"],
    majors: ["컴퓨터공학", "전자/전기", "데이터과학"],
    link: "https://careers.ncsoft.com/en/jobs/20200430-000-0025",
    group: "core",
  },
  {
    company: "Hyundai Motor",
    sector: "자동차",
    role: "Global Ph.D. Recruitment — AI/Data",
    highlights: ["자율주행/스마트모빌리티 AI·데이터 연구", "글로벌 박사 채용 트랙"],
    skills: ["ML", "CV", "로보틱스", "데이터공학"],
    majors: ["기계", "전기/전자", "컴퓨터공학", "산업공학"],
    link: "https://www.instagram.com/p/DH65t8Azk3c/",
    group: "core",
  },
  {
    company: "Lunit",
    sector: "메드테크/헬스케어",
    role: "Senior Research Engineer · AutoML",
    highlights: ["의료영상/바이오 AI AutoML 연구", "대규모 데이터/클라우드 기반 실험"],
    skills: ["Python", "PyTorch", "AutoML", "MLOps"],
    majors: ["컴퓨터공학", "데이터과학", "바이오/생명"],
    link: "https://jobs.workable.com/view/tE13XsB9UBHK9Nn4RzMkKj/(seoul)-research-engineer-%C2%B7-automl-in-seoul-at-lunit",
    group: "core",
  },

  // ── 겉보기 비(非) AI 산업군 ────────────────────────────────
  {
    company: "AMOREPACIFIC",
    sector: "화장품/뷰티",
    role: "스마트팩토리 지능화(AI) 연구/개발 (신입)",
    highlights: [
      "제조 데이터 기반 ML 알고리즘 개발",
      "LangChain/Graph·RAG, 디지털트윈",
    ],
    skills: ["Python", "ML", "LangChain", "RAG", "시뮬레이션"],
    majors: ["산업공학", "컴퓨터공학", "통계/데이터과학", "화학공학"],
    link: "https://careers.apgroup.com/job/%EC%98%A4%EC%82%B0-2025-%ED%95%98%EB%B0%98%EA%B8%B0-AMOREPACIFIC-%EC%8B%A0%EC%9E%85%EC%82%AC%EC%9B%90-%EC%88%98%EC%8B%9C%EC%B1%84%EC%9A%A9_%EC%8A%A4%EB%A7%88%ED%8A%B8%ED%8C%A9%ED%86%A0%EB%A6%AC-%EC%A7%80%EB%8A%A5%ED%99%94(AI)-%EC%97%B0%EA%B5%AC%EA%B0%9C%EB%B0%9C/1213130166/",
    group: "nonAI",
  },
  {
    company: "대한항공",
    sector: "항공/여객",
    role: "전문인력(Data) — 신입/경력",
    highlights: ["DW·데이터레이크/ETL", "AI/ML 개발·운영"],
    skills: ["Data Lake", "ETL", "AI/ML", "모델링"],
    majors: ["산업공학", "컴퓨터공학", "통계/데이터과학"],
    link: "https://www.jobkorea.co.kr/Recruit/GI_Read/45939499",
    group: "nonAI",
  },
  {
    company: "POSCO DX",
    sector: "제조/스마트팩토리",
    role: "AI 분야 — 신입/경력",
    highlights: ["제조 지능화, LLM/에이전트 적용", "공정 최적화/검색 고도화"],
    skills: ["Python", "LLM", "MLOps", "지식그래프"],
    majors: ["컴퓨터공학", "산업공학", "전기/전자", "수학/통계"],
    link: "https://www.jobkorea.co.kr/Recruit/GI_Read/47384164",
    group: "nonAI",
  },
  {
    company: "CJ제일제당",
    sector: "식품/바이오",
    role: "BIO R&D 신입 — (모집 분야에 AI 포함)",
    highlights: ["바이오 데이터 기반 모델링/최적화", "R&D 내 AI 관련 직무"],
    skills: ["Python", "통계", "ML", "실험데이터 분석"],
    majors: ["바이오/생명", "식품공학", "컴퓨터공학", "데이터과학"],
    link: "https://www.catch.co.kr/NCS/RecruitInfoDetails/496000",
    group: "nonAI",
  },
  {
    company: "신세계디에프(면세점)",
    sector: "리테일/면세",
    role: "데이터분석 (경력)",
    highlights: ["고객/매출 데이터 분석", "의사결정 대시보드/리포트"],
    skills: ["SQL", "통계분석", "대시보드"],
    majors: ["경영정보", "통계/데이터과학", "컴퓨터공학"],
    link: "https://www.jobkorea.co.kr/Recruit/GI_Read/46978542",
    group: "nonAI",
  },
  {
    company: "삼성화재해상보험",
    sector: "보험/금융",
    role: "경력사원 — AI 개발",
    highlights: ["보험 서비스 고도화(딥러닝·NLP·음성)", "운영/플랫폼 개발"],
    skills: ["Python", "딥러닝", "NLP", "MLOps"],
    majors: ["컴퓨터공학", "전자/전기", "수학/통계"],
    link: "https://www.jobkorea.co.kr/Recruit/GI_Read/46653273",
    group: "nonAI",
  },

  // ====== ▼ 여기부터 사용자가 요청한 “추가 데이터 베이스” 반영 ▼ ======
  // 1) 인터넷/플랫폼 (3+)
  {
    company: "카카오",
    role: "AI Safety 엔지니어",
    sector: "인터넷/플랫폼",
    highlights: ["생성형 AI 안전성 확보(가드레일/정책/리스크) 전담."],
    skills: ["AI Safety", "LLM 평가/가드레일", "정책/리스크"],
    majors: ["컴퓨터공학", "데이터사이언스", "전산"],
    link: "https://careers.kakao.com/jobs",
    source: "카카오 채용",
    region: "성남/판교",
    group: "core",
  },
  {
    company: "네이버",
    role: "광고 AI 서빙 플랫폼 개발",
    sector: "인터넷/플랫폼",
    highlights: ["광고 비즈니스의 핵심 AI 모델/플랫폼 개발 및 효율 개선."],
    skills: ["광고추천", "AI 서빙", "대규모분산"],
    majors: ["컴퓨터공학", "산업공학", "전산"],
    link: "https://recruit.navercorp.com/rcrt/list.do",
    source: "NAVER 채용",
    region: "성남/분당",
    group: "core",
  },
  {
    company: "네이버",
    role: "콘텐츠/AI 서비스 프로덕트 디자인",
    sector: "인터넷/플랫폼",
    highlights: ["콘텐츠/AI 검색·추천 경험 설계(디자인) 역할."],
    skills: ["AI 서비스 기획", "UX", "데이터 기반 설계"],
    majors: ["디자인", "산업공학", "경영"],
    link: "https://recruit.navercorp.com/rcrt/list.do?srchClassCd=2000000",
    source: "NAVER 채용",
    region: "성남/분당",
    group: "core",
  },

  // 2) 이커머스/리테일 (3+)
  {
    company: "쿠팡",
    role: "Staff ML Engineer — AI & Knowledge Engineering",
    sector: "이커머스/리테일",
    highlights: ["시맨틱 지식베이스·에이전트·NLP·LLM 융합 엔지니어링."],
    skills: ["LLM", "지식그래프", "에이전트", "NLP"],
    majors: ["컴퓨터공학", "수학/통계", "데이터사이언스"],
    link: "https://www.coupang.jobs/en/jobs/6918296/staff-machine-learning-engineer-ai-knowledge-engineering/",
    source: "Coupang Jobs",
    region: "서울/송파",
    group: "core",
  },
  {
    company: "쿠팡 플레이",
    role: "Staff ML Engineer (Recommendation & Personalization)",
    sector: "이커머스/리테일",
    highlights: ["VOD/라이브 등 대규모 콘텐츠 추천·개인화 모델 개발."],
    skills: ["추천시스템", "콘텐츠랭킹", "대규모데이터"],
    majors: ["컴퓨터공학", "수학/통계", "전산"],
    link: "https://www.coupang.jobs/en/jobs/6832782/staff-machine-learning-engineer-recommendation-and-personalization-coupang-play/",
    source: "Coupang Jobs",
    region: "서울",
    group: "core",
  },
  {
    company: "쿠팡 미디어그룹",
    role: "Staff ML Engineer (Ads Quality)",
    sector: "이커머스/리테일",
    highlights: ["광고 플랫폼 품질 위한 ML 모델·최적화·피처링."],
    skills: ["광고품질", "ML 모델", "최적화"],
    majors: ["컴퓨터공학", "산업공학", "수학/통계"],
    link: "https://builtin.com/job/staff-machine-learning-engineer-cmg-engineering/3978546",
    source: "BuiltIn (공고 미러)",
    region: "서울/판교",
    group: "core",
  },

  // 3) 게임/엔터테인먼트 (3+)
  {
    company: "KRAFTON",
    role: "AI 전략가 (Deep Learning Div.)",
    sector: "게임/엔터",
    highlights: ["최신 딥러닝·LLM 기반 게임 시스템/전략 수립."],
    skills: ["딥러닝", "LLM/디퓨전", "연구전략"],
    majors: ["컴퓨터공학", "AI/로보틱스", "전산"],
    link: "https://www.krafton.com/careers/recruit-detail/?job=4241&search_list_cnt=1000&var_page=1",
    source: "KRAFTON 채용",
    region: "서울/역삼",
    group: "core",
  },
  {
    company: "KRAFTON",
    role: "AI 도입 스페셜리스트 (Global Ops)",
    sector: "게임/엔터",
    highlights: ["엔터프라이즈급 AI 도입/운영 프로젝트 총괄."],
    skills: ["AI 솔루션 도입", "PMO", "업무프로세스 개선"],
    majors: ["산업공학", "컴퓨터공학", "경영"],
    link: "https://krafton.com/en/careers/recruit-detail/?job=4070&search_list_cnt=10&var_page=1",
    source: "KRAFTON 채용",
    region: "서울/역삼",
    group: "core",
  },
  {
    company: "NC(엔씨) AI",
    role: "AI 연구/엔지니어 포지션",
    sector: "게임/엔터",
    highlights: ["게임 AI/멀티모달 연구·엔지니어링 포지션 상시."],
    skills: ["RL/LLM", "컴퓨터비전", "음성/자연어"],
    majors: ["컴퓨터공학", "수학/통계", "AI/로보틱스"],
    link: "https://nc-ai.career.greetinghr.com/",
    source: "NC AI 채용 허브",
    region: "성남/분당",
    group: "core",
  },

  // 4) 자동차/모빌리티/로보틱스 (3+)
  {
    company: "현대자동차그룹",
    role: "Global Ph.D. Recruiting (AI/Data)",
    sector: "자동차/로보틱스",
    highlights: ["모빌리티 핵심 AI/데이터 분야 글로벌 박사 채용."],
    skills: ["자율주행/인지", "데이터/AI", "SW"],
    majors: ["전기전자", "컴퓨터공학", "기계/항공"],
    link: "https://princetonkoreans.org/2025/03/11/hyundai-motor-group-global-phd-recruiting-2025/",
    source: "현대차그룹 공지(학교게시)",
    region: "글로벌",
    group: "core",
  },
  {
    company: "현대자동차",
    role: "Principal Engineer – Process/AI",
    sector: "자동차/로보틱스",
    highlights: ["제조공정 AI/데이터 기반 고도화 리드."],
    skills: ["제조AI", "공정최적화", "데이터분석"],
    majors: ["산업공학", "전기전자", "컴퓨터공학"],
    link: "https://www.linkedin.com/jobs/view/4197131381/",
    source: "현대자동차(링크드인 공고)",
    region: "울산/화성 등",
    group: "core",
  },
  {
    company: "현대오토에버",
    role: "[EnIT] Backend - 생성형 AI Service",
    sector: "자동차/로보틱스",
    highlights: ["차량/고객경험 분야 생성형 AI 서비스 백엔드 개발."],
    skills: ["백엔드", "LLM 서비스", "API"],
    majors: ["컴퓨터공학", "소프트웨어", "전산"],
    link: "https://kr.indeed.com/q-%EB%A7%88%EC%BC%80%ED%8C%85-sql-l-%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C-%EC%B1%84%EC%9A%A9%EA%B3%B5%EA%B3%A0.html",
    source: "Indeed(요약 리스트)",
    region: "서울/강남",
    group: "core",
  },

  // 5) 금융/핀테크/보험 (3+)
  {
    company: "카카오뱅크",
    role: "AI Research Engineer",
    sector: "금융/핀테크/보험",
    highlights: ["뱅킹 도메인의 생성형 AI 연구·적용."],
    skills: ["RAG", "STT/TTS", "추천/검색"],
    majors: ["컴퓨터공학", "전산", "수학/통계"],
    link: "https://recruit.kakaobank.com/jobs/P-1693584672",
    source: "카카오뱅크 채용",
    region: "성남/판교",
    group: "core",
  },
  {
    company: "삼성화재",
    role: "AI/머신러닝 모델링 등 디지털/데이터 직무",
    sector: "금융/핀테크/보험",
    highlights: ["보험 리스크/가격/고객 분석 등 AI·ML 모델링."],
    skills: ["머신러닝", "리스크모델", "데이터분석"],
    majors: ["수학/통계", "산업공학", "컴퓨터공학"],
    link: "https://recruit.samsungfire.com/samsungfire/position/list.do",
    source: "삼성화재 채용",
    region: "서울",
    group: "core",
  },
  {
    company: "KB국민은행",
    role: "디지털 플랫폼·데이터 전략(자본시장/AI)",
    sector: "금융/핀테크/보험",
    highlights: ["자본시장 데이터/AI 기반 전략·플랫폼 고도화."],
    skills: ["AI·데이터", "정형/비정형", "플랫폼"],
    majors: ["경영/경제", "데이터사이언스", "컴퓨터공학"],
    link: "https://kbrecruit.incruit.com/jobdb_info/jobpost.asp?job=2409120005362",
    source: "KB 채용 공고(인크루트)",
    region: "서울/여의도",
    group: "core",
  },

  // 6) 헬스케어/바이오 (3+)
  {
    company: "루닛(Lunit)",
    role: "AI/엔지니어·리서치 채용 안내",
    sector: "헬스케어/바이오",
    highlights: ["암 진단·치료 AI 제품군/클라우드 기반 기술."],
    skills: ["의료영상AI", "클라우드", "MLOps"],
    majors: ["의생명", "컴퓨터공학", "전산"],
    link: "https://www.lunit.io/careers",
    source: "Lunit Careers",
    region: "서울",
    group: "core",
  },
  {
    company: "뷰노(VUNO)",
    role: "AI 의료솔루션 R&D/엔지니어",
    sector: "헬스케어/바이오",
    highlights: ["의료 AI 제품/특허·글로벌 PoC 다수."],
    skills: ["의료영상", "딥러닝", "신호처리"],
    majors: ["의생명", "전기전자", "컴퓨터공학"],
    link: "https://www.vuno.co/",
    source: "VUNO 공식",
    region: "서울",
    group: "core",
  },
  {
    company: "딥바이오(Deep Bio)",
    role: "AI 디지털병리 R&D/제품",
    sector: "헬스케어/바이오",
    highlights: ["AI 병리 진단 소프트웨어·글로벌 학회 연구 발표."],
    skills: ["딥러닝", "병리영상", "바이오마커"],
    majors: ["의생명", "컴퓨터공학", "통계"],
    link: "https://deepbio.co.kr/",
    source: "Deep Bio 공식",
    region: "서울",
    group: "core",
  },

  // 7) 제조/스마트팩토리/물류 (3+)
  {
    company: "아모레퍼시픽",
    role: "스마트팩토리 지능화(AI) 연구/개발",
    sector: "제조/스마트팩토리/물류",
    highlights: ["제조 데이터 기반 ML, 제조 특화 RAG·시뮬레이션/DT."],
    skills: ["제조AI", "LangChain/RAG", "디지털트윈"],
    majors: ["산업공학", "컴퓨터공학", "화학/소재"],
    link: "https://careers.apgroup.com/job/%EC%98%A4%EC%82%B0-2025-%ED%95%98%EB%B0%98%EA%B8%B0-AMOREPACIFIC-%EC%8B%A0%EC%9E%85%EC%82%AC%EC%9B%90-%EC%88%98%EC%8B%9C%EC%B1%84%EC%9A%A9_%EC%8A%A4%EB%A7%88%ED%8A%B8%ED%8C%A9%ED%86%A0%EB%A6%AC-%EC%A7%80%EB%8A%A5%ED%99%94%28AI%29-%EC%97%B0%EA%B5%AC%EA%B0%9C%EB%B0%9C/1213130166/",
    source: "AP 채용(공고 본문에 RAG/DT 명시)",
    region: "오산",
    group: "nonAI",
  },
  {
    company: "포스코DX",
    role: "AI 분야 신입/경력 채용",
    sector: "제조/스마트팩토리/물류",
    highlights: ["제조·설비·공간 데이터 기반 AI 직군 채용."],
    skills: ["Agentic AI", "Decision Intelligence", "Spatial AI"],
    majors: ["컴퓨터공학", "산업공학", "전기전자"],
    link: "https://linkareer.com/activity/231007",
    source: "포스코DX 채용안내(요약)",
    region: "포항/인천 등",
    group: "nonAI",
  },
  {
    company: "CJ대한통운",
    role: "[디지털플랫폼] Data Scientist",
    sector: "제조/스마트팩토리/물류",
    highlights: ["물류 데이터 기반 수요예측/최적화, 운영지표 분석·모델 개발."],
    skills: ["Python", "SQL", "예측모델링", "최적화"],
    majors: ["산업공학", "통계/데이터과학", "컴퓨터공학"],
    link: "https://www.jobkorea.co.kr/Recruit/GI_Read/47188448",
    source: "잡코리아(공고)",
    region: "서울/글로벌",
    group: "nonAI",
  },

  // 8) 교육/에듀테크 (3+)
  {
    company: "뤼이드(Riiid)",
    role: "Research Scientist",
    sector: "교육/에듀테크",
    highlights: ["학습진단/개인화 AI 모델 연구·제품 적용."],
    skills: ["시계열모델", "추천", "디바이어싱"],
    majors: ["컴퓨터공학", "수학/통계", "교육공학"],
    link: "https://startup.jobs/research-scientist-riiid-labs-4285084",
    source: "Riiid 채용",
    region: "서울/글로벌",
    group: "nonAI",
  },
  {
    company: "클라썸(Classum)",
    role: "사업/운영 — AI LLM·RAG 활용 서비스",
    sector: "교육/에듀테크",
    highlights: ["대학 상담 LLM+RAG, AI 기능 내장 LXP 등 제품 운영·사업."],
    skills: ["LLM·RAG", "LXP", "데이터"],
    majors: ["교육공학", "경영", "컴퓨터공학"],
    link: "https://careers.classum.com/ko/o/167532",
    source: "Classum 채용",
    region: "서울/강남",
    group: "nonAI",
  },
  {
    company: "Mathpresso(QANDA)",
    role: "AI 기반 학습 서비스(회사 소개/기능)",
    sector: "교육/에듀테크",
    highlights: ["OCR/LLM 기반 학습 플랫폼·AI 튜터 운영."],
    skills: ["OCR", "LLM 튜터", "추천"],
    majors: ["컴퓨터공학", "수학/통계", "교육공학"],
    link: "https://qanda.ai/en",
    source: "QANDA 공식",
    region: "서울/글로벌",
    group: "nonAI",
  },

  // 9) 항공/여객 (3+)
  {
    company: "대한항공",
    role: "Data 직무(클라우드/Data Platform)",
    sector: "항공/여객",
    highlights: ["대용량 DW/클라우드 기반 데이터 분석 환경 운영."],
    skills: ["데이터플랫폼", "DW/ETL", "분석"],
    majors: ["컴퓨터공학", "산업공학", "데이터"],
    link: "https://www.jobkorea.co.kr/Recruit/GI_Read/45939499",
    source: "잡코리아(대한항공 공고 미러)",
    region: "서울/강서",
    group: "nonAI",
  },
  {
    company: "대한항공",
    role: "AICC/챗봇 등 AI 고객센터 혁신",
    sector: "항공/여객",
    highlights: ["AI 음성봇·챗봇 기반 AICC로 고객경험 고도화."],
    skills: ["AI 챗봇", "AICC", "CX 데이터"],
    majors: ["데이터사이언스", "컴퓨터공학", "경영"],
    link: "https://news.koreanair.com/%EB%8C%80%ED%95%9C%ED%95%AD%EA%B3%B5-%ED%98%81%EC%8B%A0%EA%B8%B0%EC%88%A0-%EC%A0%81%EC%9A%A9%ED%95%9C-%EC%9D%B8%EA%B3%B5%EC%A7%80%EB%8A%A5%EC%BB%A8%ED%83%9D%EC%84%BC%ED%84%B0aicc-%EA%B5%AC/",
    source: "대한항공 공식 뉴스룸",
    region: "서울/강서",
    group: "nonAI",
  },
  {
    company: "대한항공",
    role: "카카오톡 AI 챗봇 ‘대한이’ 운영",
    sector: "항공/여객",
    highlights: ["여정 전반 문의 응대·개인화 확대(생성형 AI 도입 예정)."],
    skills: ["AI 챗봇", "NLU/NLP", "여정지원"],
    majors: ["컴퓨터공학", "산업공학", "경영"],
    link: "https://news.koreanair.com/%EB%8C%80%ED%95%9C%ED%95%AD%EA%B3%B5-%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%86%A1-%EC%B1%97%EB%B4%87-%EC%84%9C%EB%B9%84%EC%8A%A4-%EB%8C%80%ED%95%9C%EC%9D%B4-%EC%9A%B4%EC%98%81-%EA%B0%9C%EC%8B%9C/",
    source: "대한항공 공식 뉴스룸",
    region: "서울/강서",
    group: "nonAI",
  },
  // ====== ▲ 추가 DB 끝 ▲ ======
];

/** 발표 웹페이지 — AI 채용 사례 (AI 중심 + 비(非) AI 산업군) */
export default function MergedAIJobsWebPage() {
  const allMajors = Array.from(
    new Set(companies.flatMap((c) => c.majors))
  ).sort();

  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<"all" | "core" | "nonAI">("all");
  const [majorFilter, setMajorFilter] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return companies.filter((c) => {
      if (group !== "all" && c.group !== group) return false;
      if (majorFilter.length && !majorFilter.some((m) => c.majors.includes(m)))
        return false;
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return (
        c.company.toLowerCase().includes(q) ||
        c.sector.toLowerCase().includes(q) ||
        c.role.toLowerCase().includes(q) ||
        c.skills.join(" ").toLowerCase().includes(q)
      );
    });
  }, [group, majorFilter, query]);

  const toggleMajor = (m: string) =>
    setMajorFilter((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
    );

  return (
    <div className="min-h-screen w-full bg-white text-gray-900 p-6 md:p-10">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">
          산업 전반으로 확산되는 AI 채용 사례
        </h1>
        <p className="text-sm md:text-base text-gray-600 mt-2">
          고등학생들도 아는 대기업의 AI 직무부터, 겉보기엔 비(非) AI 산업처럼 보이는
          업종까지 실제 공고에서 발췌한 요구역량을 모았습니다. (링크 클릭 시 원문 이동)
        </p>
      </header>

      {/* 컨트롤바 */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-6">
        <div className="inline-flex rounded-xl border border-gray-200 overflow-hidden">
          {[
            { k: "all", label: "전체" },
            { k: "core", label: "AI 중심 산업군" },
            { k: "nonAI", label: "비(非) AI 산업군" },
          ].map((t) => (
            <button
              key={t.k}
              onClick={() => setGroup(t.k as any)}
              className={`px-4 py-2 text-sm ${
                group === t.k
                  ? "bg-gray-900 text-white"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <input
          placeholder="회사/직무/스킬 검색 (예: LLM, 데이터분석)"
          className="w-full md:w-96 rounded-xl border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* 전공 필터 */}
      <div className="mb-5 flex flex-wrap gap-2">
        {allMajors.map((m) => (
          <button
            key={m}
            onClick={() => toggleMajor(m)}
            className={`text-[11px] px-3 py-1 rounded-full border ${
              majorFilter.includes(m)
                ? "bg-emerald-600 text-white border-emerald-600"
                : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
            }`}
          >
            {m}
          </button>
        ))}
        {majorFilter.length > 0 && (
          <button
            onClick={() => setMajorFilter([])}
            className="text-[11px] px-3 py-1 rounded-full border bg-gray-50 text-gray-600 hover:bg-gray-100"
          >
            전공 필터 초기화
          </button>
        )}
      </div>

      {/* 카드 그리드 */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((c) => (
          <article
            key={c.company + c.role}
            className="rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">{c.company}</h2>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 border border-gray-200">
                {c.sector}
              </span>
            </div>

            <div
              className={`mb-2 text-sm font-medium ${
                c.group === "nonAI" ? "text-emerald-700" : "text-indigo-700"
              }`}
            >
              {c.role}
            </div>

            <ul className="list-disc pl-5 space-y-1 text-sm">
              {c.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>

            <div className="mt-3 flex flex-wrap gap-2">
              {c.skills.map((s) => (
                <span
                  key={s}
                  className="text-[11px] px-2 py-1 rounded-md bg-emerald-50 border border-emerald-200"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-3 text-xs text-gray-600">
              선호 전공: {c.majors.join(" · ")}
            </div>

            <a
              href={c.link}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
            >
              공고 원문 보기
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M12.97 3.97a.75.75 0 011.06 0l6 6a.75.75 0 11-1.06 1.06L13.5 6.56V20.25a.75.75 0 01-1.5 0V6.56l-5.47 5.47a.75.75 0 11-1.06-1.06l6-6z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </article>
        ))}
      </section>

      <footer className="mt-10 text-xs text-gray-400">
        업데이트: 2025-08-11 · 실제 공고 링크 포함
      </footer>
    </div>
  );
}

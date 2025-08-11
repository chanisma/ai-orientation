// MergedAIJobsWebPage.tsx
import React, { useMemo, useState } from "react";

/** 발표 웹페이지 — AI 채용 사례 (AI 중심 + 비(非) AI 산업군) */
export default function MergedAIJobsWebPage() {
  type Company = {
    company: string;
    sector: string;
    role: string;
    highlights: string[];
    skills: string[];
    majors: string[];
    link: string;
    group: "core" | "nonAI"; // core: AI 중심 산업군, nonAI: 겉보기 비AI 산업
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
      company: "CJ대한통운",
      sector: "물류/택배",
      role: "[디지털플랫폼] Data Scientist",
      highlights: ["수요예측/최적화", "운영지표 분석·모델 개발"],
      skills: ["Python", "SQL", "예측모델링", "최적화"],
      majors: ["산업공학", "통계/데이터과학", "컴퓨터공학"],
      link: "https://www.jobkorea.co.kr/Recruit/GI_Read/47188448",
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
  ];

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
  }, [companies, group, majorFilter, query]);

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
// src/pages/AIrequirementsjob.tsx
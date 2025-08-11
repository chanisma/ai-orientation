import React, { useMemo, useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, ChevronLeft, ChevronRight, ExternalLink, Filter } from "lucide-react";

// 안전한 영상 표시 컴포넌트 (학교 PC/보안 정책 대비)
function VideoBox({ url, title }: { url: string; title: string }) {
  const [tryEmbed, setTryEmbed] = React.useState(false);
  if (!url) return null;

  const isYouTube = /youtube/.test(url);
  const ytId = isYouTube ? (url.match(/embed\/([^?&]+)/)?.[1] ?? null) : null;
  const poster = ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null;
  const watchUrl = ytId ? `https://www.youtube.com/watch?v=${ytId}&autoplay=1` : url;
  const embedUrl = isYouTube ? url.replace("youtube.com/embed", "www.youtube-nocookie.com/embed") : url;

  return (
    <div className="relative w-full h-full">
      {tryEmbed ? (
        <iframe
          className="w-full h-full"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={() => window.open(watchUrl, "_blank", "noopener,noreferrer")}
          onKeyDown={(e) => { if (e.key === "Enter") window.open(watchUrl, "_blank", "noopener,noreferrer"); }}
          className="w-full h-full relative cursor-pointer"
        >
          {poster ? (
            <img src={poster} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm">영상은 새 탭에서 재생됩니다</div>
          )}
          <div className="absolute inset-0 bg-black/30 hover:bg-black/20 transition flex items-center justify-center">
            <div className="rounded-full bg-white/90 px-4 py-2 shadow text-sm font-medium">새 탭에서 재생</div>
          </div>
        </div>
      )}
      <div className="absolute bottom-2 right-2 flex gap-2">
        <button
          onClick={() => setTryEmbed(v => !v)}
          className="rounded-full bg-white/80 px-3 py-1 text-xs shadow hover:bg-white"
          title="보안 정책으로 임베드가 차단될 수 있어요"
        >
          {tryEmbed ? "임베드 중지" : "임베드 시도"}
        </button>
      </div>
    </div>
  );
}

// 슬라이드 데이터 (분야당 최대 2개, 푸른 들판 테마)
const slidesData = [
  // 타이틀
  {
    id: "title",
    field: "",
    title: "인공지능 기초 — 인공지능 시대",
    subtitle: "교과: 인공지능 기초 | 대상: 고등학생",
    tagline: "일상에서 느끼는 AI → 전공별 확장",
    bullets: [
      "한 장씩 발표처럼 보기 (← / →)",
      "오른쪽 위 필터로 관심 분야만 보기",
      "링크는 수업 중 즉시 시연 가능"
    ],
    videoUrl: null,
    articleUrl: null,
    outputs: [],
    imageUrl: null,
  },

  // 생명공학
  {
    id: "biotech-alfafold3",
    field: "생명공학",
    title: "AlphaFold 3 — 단백질·분자 상호작용 예측",
    subtitle: "DeepMind · Isomorphic Labs",
    tagline: "실험 대신 컴퓨터 예측",
    bullets: [
      "단백질·DNA·약물 후보 상호작용 예측",
      "연구 초기 설계 시간 단축",
    ],
    videoUrl: "https://www.youtube.com/embed/9ufplEgtq8w?rel=0",
    articleUrl: "https://dongascience.donga.com/news.php?idx=66688",
    outputs: [
      { label: "AlphaFold Server", url: "https://alphafoldserver.com/" },
      { label: "DeepMind 소개", url: "https://deepmind.google/science/alphafold/" },
    ],
    imageUrl: null,
  },

  // 의료
  {
    id: "health-vuno-cxr",
    field: "의료",
    title: "VUNO Med — Chest X-ray 진단 보조",
    subtitle: "흉부 X-ray 이상 소견 검출",
    tagline: "응급·검진 판독 보조",
    bullets: [
      "결절·경화·기흉 등 검출",
      "현장 판독 시간 단축",
    ],
    videoUrl: "https://www.youtube.com/embed/8vzIM8KWYq8?rel=0",
    articleUrl: "https://www.biospectator.com/news/view/25124",
    outputs: [
      { label: "제품 페이지", url: "https://www.vuno.co/chest" },
    ],
    imageUrl: null,
  },
  {
    id: "health-lunit",
    field: "의료",
    title: "Lunit INSIGHT — 유방촬영·흉부 X-ray AI",
    subtitle: "암 조기 발견·업무량 감소",
    tagline: "임상 근거 다수",
    bullets: [
      "정상 자동 분류로 효율↑",
      "국제 학술지 다수 게재",
    ],
    videoUrl: "https://www.youtube.com/embed/zlhPeZYnA_A?rel=0",
    articleUrl: "https://www.lunit.io/en/products/mmg",
    outputs: [
      { label: "CXR 제품", url: "https://www.lunit.io/en/products/cxr" }
    ],
    imageUrl: null,
  },

  // 건축/건설
  {
    id: "aec-omniverse",
    field: "건축/건설",
    title: "NVIDIA Omniverse — 디지털 트윈 협업",
    subtitle: "AEC 실시간 시뮬레이션",
    tagline: "BIM 연동·동시협업",
    bullets: [
      "툴 간 장면 동기화",
      "시공 전 전 단계 검토",
    ],
    videoUrl: "https://www.youtube.com/embed/lxQe0O2Qw_E?rel=0",
    articleUrl: "https://www.nvidia.com/ko-kr/industries/aec/",
    outputs: [],
    imageUrl: null,
  },
  {
    id: "aec-safety-ai",
    field: "건축/건설",
    title: "현대건설 — AI 안전관리",
    subtitle: "CCTV 비전·IoT·빅데이터",
    tagline: "현장 사고 예방",
    bullets: [
      "불안전 행동 즉시 알림",
      "스마트 안전 시스템 확산",
    ],
    videoUrl: null,
    // 기사 링크 교체 (접속 불가 링크 → 현대건설 보도자료)
    articleUrl: "https://en.hdec.kr/en/company/press_view.aspx?CompanyPressSeq=400",
    outputs: [],
    imageUrl: null,
  },

  // 경영/고객센터·리테일
  {
    id: "biz-kakao-aicc",
    field: "경영/고객센터",
    title: "카카오엔터프라이즈 — AICC CenterFlow",
    subtitle: "AI 상담봇·음성봇",
    tagline: "구독형 빠른 도입",
    bullets: [
      "산업별 템플릿",
      "음성봇 제공",
    ],
    // 재생 불가 영상 교체 (센터플로우 공식 채널 데모)
    videoUrl: "https://www.youtube.com/embed/A2wbDbCNCYk?rel=0",
    articleUrl: "https://www.kakaocorp.com/page/service/service/CenterFlow",
    outputs: [
      { label: "센터플로우 홈페이지", url: "https://centerflow.kakaocloud.com/" },
      { label: "가이드(무료 체험)", url: "https://guide.centerflow.kakaocloud.com/" },
      { label: "보도자료", url: "https://kakaoenterprise.com/press/centerflow-kakaocloud/" },
    ],
    imageUrl: null,
  },
  {
    id: "biz-lotte-zeta",
    field: "경영/리테일",
    title: "롯데마트 ZETTA — AI 그로서리/신선지능",
    subtitle: "수요예측·물류 최적화",
    tagline: "맞춤 장바구니",
    bullets: [
      "재고관리·피킹·배차 최적화",
      "품질 정보 캠페인",
    ],
    videoUrl: "https://www.youtube.com/embed/-5RXTKzwAGc?rel=0",
    articleUrl: "https://www.hankyung.com/article/202504037715i",
    outputs: [
      { label: "현황 기사", url: "https://www.fntimes.com/html/view.php?ud=20250410152733345b5b890e35c_18" },
      { label: "캠페인 소개", url: "https://www.mk.co.kr/news/business/11251233" },
    ],
    imageUrl: null,
  },

  // 디자인
  {
    id: "design-firefly-video",
    field: "디자인",
    title: "Adobe Firefly — 텍스트→영상·사운드",
    subtitle: "상업적 사용 안전성·보드 협업",
    tagline: "아이디어 즉시 시각화",
    bullets: [
      "비디오 모델(2025)",
      "Premiere Pro 통합",
    ],
    // 공식 Firefly Video Model 소개 영상 추가
    videoUrl: "https://www.youtube.com/embed/fjk2mMFBpRo?rel=0",
    articleUrl: "https://blog.adobe.com/ko/publish/2025/02/13/meet-firefly-video-model-ai-powered-creation-with-unparalleled-creative-control",
    outputs: [
      { label: "Firefly 소개", url: "https://www.adobe.com/kr/products/firefly.html" },
      { label: "업데이트(2025-07)", url: "https://blog.adobe.com/ko/publish/2025/07/24/firefly-expands-with-new-video-capabilities-that-offer-more-creative-control-generate-sound-effects" }
    ],
    imageUrl: null,
  },
  {
    id: "design-figma-ai",
    field: "디자인",
    title: "Figma AI — 프롬프트로 모형 자동 생성",
    subtitle: "프로토타입 동영상 삽입·자동 레이아웃",
    tagline: "반복 작업 감소",
    bullets: [
      "화면/컴포넌트 뼈대 생성",
      "튜토리얼 다수",
    ],
    videoUrl: "https://www.youtube.com/embed/knUS7G8m8Jw?rel=0",
    articleUrl: "https://www.figma.com/ko-kr/pricing/",
    outputs: [
      { label: "마스터 클래스", url: "https://www.youtube.com/watch?v=x4iT2rbLmUs" }
    ],
    imageUrl: null,
  },

  // 애니메이션/영상
  {
    id: "animation-runway-gen3",
    field: "애니메이션/영상",
    title: "Runway Gen-3 — 텍스트→시네마틱 영상",
    subtitle: "Video-to-Video/컨트롤",
    tagline: "스타일 실험 빠르게",
    bullets: [
      "텍스트/이미지→영상",
      "아카데미 제공",
    ],
    videoUrl: "https://www.youtube.com/embed/nByslCkykj8?rel=0",
    articleUrl: "https://www.bloter.net/news/articleView.html?idxno=627392",
    outputs: [
      { label: "Runway 아카데미", url: "https://academy.runwayml.com/gen3-alpha/gen3-alpha-video-to-video" }
    ],
    imageUrl: null,
  },
  {
    id: "animation-pika",
    field: "애니메이션/영상",
    title: "Pika 1.0 — 아이디어→동영상",
    subtitle: "텍스트/이미지/영상 입력",
    tagline: "무료 플랜 체험",
    bullets: [
      "3~4초 샘플 생성",
      "모션 제어 강화",
    ],
    videoUrl: "https://www.youtube.com/embed/6b10jGNNbXQ?rel=0",
    articleUrl: "https://www.bloter.net/news/articleView.html?idxno=639289",
    outputs: [],
    imageUrl: null,
  },

  // 방송
  {
    id: "broadcast-kbs-legend",
    field: "방송",
    title: "KBS — 전설의 고향: 구미호 (AI 제작)",
    subtitle: "캐릭터·애니·음성 합성",
    tagline: "지상파 AI 애니",
    bullets: [
      "어린이날 특집(2025-05)",
      "방송 후 VOD 예정",
    ],
    videoUrl: "https://www.youtube.com/embed/qYJw_DLDpbc?rel=0",
    articleUrl: "http://vod.kbs.co.kr/index.html?broadcast_complete_yn=N&local_station_code=00&program_code=T2025-0097&program_id=PS-2025072122-01-000",
    outputs: [],
    imageUrl: null,
  },
  {
    id: "broadcast-sbs-auto-subtitle",
    field: "방송",
    title: "SBS/네이버 — 실시간 자막·번역 AI",
    subtitle: "실시간 STT/자동 자막",
    tagline: "라이브 적용",
    bullets: [
      "네이버 ‘클로바 스피치’",
      "다국어 확장",
    ],
    videoUrl: "https://www.youtube.com/embed/1HbMLrwpVuA?rel=0",
    articleUrl: "https://www.newstree.kr/newsView/ntr202402020001",
    outputs: [
      { label: "자막 정확도 기사", url: "https://www.nocutnews.co.kr/news/5267604" }
    ],
    imageUrl: null,
  },

  // (삭제됨) 교육/AI 디지털 교과서 슬라이드 — 요청에 따라 제거

  // 농업 (영상/기사 교체)
  {
    id: "agri-smartfarm-robot",
    field: "농업",
    title: "스마트팜·농업 로봇 — 병해충·수확 자동화",
    subtitle: "센서·비전·로봇+AI",
    tagline: "자율주행·온실 제어",
    bullets: [
      "병해충 탐지·관수·수확 자동화",
      "국내 기업 AI 전략",
    ],
    // 동작 안 하던 영상 → YTN 스마트팜 보도 영상
    videoUrl: "https://www.youtube.com/embed/LLm_prBSgRc?rel=0",
    // 열리지 않던 기사 → 대동 AI 농업 기사로 교체
    articleUrl: "https://zdnet.co.kr/view/?no=20250717003716",
    outputs: [
      { label: "대동 ‘농업 3대 AI’", url: "https://www.irobotnews.com/news/articleView.html?idxno=41277" },
      { label: "지능화 플랫폼 사례", url: "https://m.boannews.com/html/detail.html?idx=130582" }
    ],
    imageUrl: null,
  },

  // 금융
  {
    id: "finance-shinhan-agent",
    field: "금융",
    title: "신한금융 — 앱 내 AI 에이전트",
    subtitle: "개인화 제안·상담",
    tagline: "자산관리·보험 설계",
    bullets: [
      "그룹 전반 AI 에이전트 적용",
      "AI PB·AI 브랜치 계획",
    ],
    videoUrl: null,
    articleUrl: "https://www.hankyung.com/article/2025071611381",
    outputs: [
      { label: "인터뷰(아주경제)", url: "https://www.ajunews.com/view/20250310085129347" },
      { label: "디지털 자산관리", url: "https://www.straightnews.co.kr/news/articleView.html?idxno=258010" }
    ],
    imageUrl: null,
  },

  // ▼ 신규 추가: AI 버튜버
  {
    id: "content-ai-vtuber",
    field: "콘텐츠/버튜버",
    title: "AI 버튜버 — Neuro-Sama",
    subtitle: "LLM + TTS 실시간 스트리밍",
    tagline: "사람 없이 운영되는 스트리머",
    bullets: [
      "LLM 대화 + 음성합성",
      "게임·토크·콜라보 진행"
    ],
    videoUrl: "https://www.youtube.com/embed/JgGGqUxMEXQ?rel=0",
    articleUrl: "https://en.wikipedia.org/wiki/Neuro-sama",
    outputs: [
      { label: "YouTube 채널", url: "https://www.youtube.com/channel/UCLHmLrj4pHHg3-iBJn_CqxA" }
    ],
    imageUrl: null,
  },

  // ▼ 신규 추가: AI 로봇(슬라이드 1개로 구성)
  {
    id: "robot-ai-warehouse",
    field: "로봇",
    title: "AI 로봇 — 물류 현장 도입",
    subtitle: "Agility Robotics ‘Digit’",
    tagline: "반복 작업 자동화",
    bullets: [
      "비전·강화학습 기반 이동/조작",
      "창고에서 토트 이동·분류"
    ],
    videoUrl: "https://www.youtube.com/embed/AJpTpUqjgrY?rel=0",
    articleUrl: "https://www.agilityrobotics.com/content/digit-deployed-at-gxo-in-historic-humanoid-raas-agreement",
    outputs: [
      { label: "GXO 소개 영상", url: "https://www.youtube.com/watch?v=Xq_-OTQgzf0" },
      { label: "TIME 기사", url: "https://time.com/7094773/agility-robotics-digit/" }
    ],
    imageUrl: null,
  },

  // ▼ 신규 추가: 네이버 웹툰 AI 페인터
  {
    id: "design-webtoon-ai-painter",
    field: "디자인/웹툰",
    title: "네이버 웹툰 — AI 페인터",
    subtitle: "자동 채색 도구",
    tagline: "작가 생산성 향상",
    bullets: [
      "영역 인식·스타일 반영",
      "PC/모바일 지원"
    ],
    // 리뷰 영상(참고용)
    videoUrl: "https://www.youtube.com/embed/7PSx43qaStE?rel=0",
    articleUrl: "https://ai.webtoons.com/ko/painter",
    outputs: [
      { label: "제품 페이지", url: "https://ai.webtoons.com/ko/painter" },
      { label: "출시 기사(ZDNet)", url: "https://zdnet.co.kr/view/?no=20211027094527" }
    ],
    imageUrl: null,
  },

  // ▼ 신규 추가: Reverse Turing Test (요청하신 영상)
  {
    id: "game-reverse-turing",
    field: "게임/실험",
    title: "리버스 튜링 테스트 — AI가 ‘인간’을 찾기",
    subtitle: "Tamulur 실험",
    tagline: "대화형 AI NPC 심리게임",
    bullets: [
      "GPT-4/Claude/Llama 등 참여",
      "질문·추론으로 정체 검증"
    ],
    videoUrl: "https://www.youtube.com/embed/TM6MBhqWHrw?rel=0",
    articleUrl: "https://blog.vive.com/us/reverse-turing-test-identifies-human-among-ai/",
    outputs: [
      { label: "Tamulur 채널", url: "https://www.youtube.com/@tamulur" },
      { label: "웹 게임(Human or Not?)", url: "https://humanornot.so/" }
    ],
    imageUrl: null,
  },
];

const fields = [
  "전체",
  ...Array.from(new Set(slidesData.filter(s => s.field !== "OT").map(s => s.field)))
];

export default function OrientationPage() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [fieldFilter, setFieldFilter] = useState("전체");
  const timerRef = useRef<any>(null);

  const filteredSlides = useMemo(() => {
    const base = slidesData.filter(s => fieldFilter === "전체" ? true : s.field === fieldFilter);
    const title = slidesData[0];
    const rest = base.filter(s => s.id !== "title");
    return [title, ...rest];
  }, [fieldFilter]);

  useEffect(() => {
    if (playing) {
      timerRef.current = setInterval(() => {
        setIndex(prev => (prev + 1) % filteredSlides.length);
      }, 15000);
    }
    return () => timerRef.current && clearInterval(timerRef.current);
  }, [playing, filteredSlides.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [filteredSlides, index]);

  const next = () => setIndex((i) => (i + 1) % filteredSlides.length);
  const prev = () => setIndex((i) => (i - 1 + filteredSlides.length) % filteredSlides.length);

  const current = filteredSlides[index];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-100 text-slate-800">
      {/* 상단 바 */}
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-sky-400 to-emerald-400 shadow" />
          <div className="font-semibold">인공지능 기초 - 인공지능 시대</div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPlaying(!playing)}
            className="inline-flex items-center gap-2 rounded-2xl bg-white/70 px-4 py-2 shadow hover:bg-white transition"
            title={playing ? "자동 넘김 정지" : "15초 자동 넘김 시작"}
          >
            {playing ? <Pause size={18} /> : <Play size={18} />}
            <span className="text-sm">{playing ? "자동 재생" : "자동 재생"}</span>
          </button>
          <div className="hidden sm:flex items-center gap-2 bg-white/70 rounded-2xl px-3 py-2 shadow">
            <Filter size={16} />
            <select
              className="bg-transparent focus:outline-none text-sm"
              value={fieldFilter}
              onChange={(e) => { setFieldFilter(e.target.value); setIndex(0); }}
            >
              {fields.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* 슬라이드 */}
      <div className="mx-auto max-w-6xl px-4 pb-8">
        <div className="relative h-[70vh] rounded-3xl bg-white/60 shadow-xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 p-6 sm:p-10 grid grid-rows-[auto_1fr_auto]"
            >
              {/* 헤더 */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-wider text-emerald-700">{current.field}</div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">{current.title}</h1>
                  {current.subtitle && <div className="text-slate-600 mt-1">{current.subtitle}</div>}
                </div>
                <div className="text-right text-sm text-slate-600">
                  <div>{index + 1} / {filteredSlides.length}</div>
                  <div className="text-emerald-700 font-medium">{current.tagline}</div>
                </div>
              </div>

              {/* 본문 */}
              <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="rounded-2xl bg-slate-50/80 border border-slate-200 overflow-hidden aspect-video">
                  {current.videoUrl ? (
                    <VideoBox url={current.videoUrl} title={current.title} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm">
                      이 슬라이드는 영상 대신 기사·링크 중심으로 구성되어 있어요
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  {current.articleUrl && (
                    <a
                      href={current.articleUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 rounded-xl bg-sky-50 border border-sky-200 px-4 py-3 hover:bg-sky-100 transition"
                    >
                      <ExternalLink size={16} className="text-sky-600" />
                      <span className="text-sky-700 font-medium truncate">관련 기사/자료 보기</span>
                    </a>
                  )}

                  {current.outputs && current.outputs.length > 0 && (
                    <div className="rounded-xl bg-white/70 border border-slate-200 p-3">
                      <div className="text-sm font-semibold text-slate-700 mb-2">참고/결과물</div>
                      <div className="flex flex-wrap gap-2">
                        {current.outputs.map((o, i) => (
                          <a key={i} href={o.url} target="_blank" rel="noreferrer" className="text-xs inline-flex items-center gap-1 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 hover:bg-emerald-100">
                            <ExternalLink size={14} /> {o.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <ul className="list-disc pl-5 text-slate-700 leading-relaxed">
                    {current.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              </div>

              {/* 하단 내비 */}
              <div className="mt-4 flex items-center justify-between">
                <button onClick={prev} className="inline-flex items-center gap-2 rounded-2xl bg-emerald-200/70 px-4 py-2 hover:bg-emerald-200 transition"><ChevronLeft size={18} /> 이전</button>
                <div className="text-xs text-slate-600">← / → 키로 넘기기 • 필터: 상단 우측</div>
                <button onClick={next} className="inline-flex items-center gap-2 rounded-2xl bg-emerald-200/70 px-4 py-2 hover:bg-emerald-200 transition">다음 <ChevronRight size={18} /></button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

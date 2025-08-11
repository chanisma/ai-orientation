export interface Presentation {
  id: string;
  title: string;
  description: string;
  path: string;
}

export const presentations: Presentation[] = [
  {
    id: 'ai-generation',
    title: 'AI 시대',
    description: 'AI 네이티브 시대의 특징과 미래에 대한 발표 자료입니다.',
    path: '/presentation/ai-generation',
  },
  {
    id: 'ai-requirements-job',
    title: 'AI 시대의 필요 역량과 직무',
    description: 'AI 기술 발전에 따라 요구되는 새로운 역량과 직무에 대해 알아봅니다.',
    path: '/presentation/ai-requirements-job',
  },
];
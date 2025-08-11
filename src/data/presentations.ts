export interface Presentation {
  id: string;
  title: string;
  description: string;
  path: string;
}

export const presentations: Presentation[] = [
  {
    id: 'orientation',
    title: 'AI 기초 오리엔테이션',
    description: '수업의 목표와 전반적인 내용을 소개하는 발표 자료입니다.',
    path: '/presentation/orientation',
  },
  // 향후 이곳에 다른 발표 자료를 추가할 수 있습니다.
];

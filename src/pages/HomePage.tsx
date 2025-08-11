import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight } from 'lucide-react';
import { presentations } from '../data/presentations';

export default function HomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      <div className="container mx-auto px-6 py-16 md:py-24">
        <motion.header 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400">
            AI 기초 수업 발표자료
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300/80">
            인공지능의 다양한 분야와 미래 사회의 변화를 탐색하는 발표 자료 모음입니다. 아래 목록에서 관심 있는 주제를 선택하여 학습을 시작하세요.
          </p>
        </motion.header>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {presentations.map((p) => (
            <motion.div key={p.id} variants={itemVariants}>
              <Link
                to={p.path}
                className="group block h-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-8 transition-all duration-300 ease-in-out backdrop-blur-lg shadow-lg hover:shadow-blue-500/20 hover:-translate-y-2"
              >
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-white/10 rounded-full border border-white/20">
                        <BookOpen className="text-blue-300" size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-blue-200 group-hover:text-blue-100 transition-colors">
                        {p.title}
                    </h2>
                </div>
                <p className="text-gray-300/90 mb-6">{p.description}</p>
                <div className="flex items-center text-sm font-semibold text-blue-300 group-hover:text-white transition-colors">
                  <span>자료 보기</span>
                  <ArrowRight className="ml-2 transform transition-transform group-hover:translate-x-1" size={16} />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <footer className="text-center text-gray-500 text-sm mt-24">
          <p>이 페이지는 Gemini와 함께 디자인되었습니다.</p>
        </footer>
      </div>
    </div>
  );
}
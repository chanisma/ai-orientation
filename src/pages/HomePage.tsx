import { Link } from 'react-router-dom';
import { presentations } from '../data/presentations';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white flex flex-col items-center justify-center p-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          AI 기초 수업 발표자료
        </h1>
        <p className="text-lg text-gray-300">
          아래 목록에서 열람하고 싶은 발표 자료를 선택하세요.
        </p>
      </div>
      <div className="w-full max-w-2xl">
        <ul className="space-y-4">
          {presentations.map((p) => (
            <li key={p.id}>
              <Link
                to={p.path}
                className="block bg-gray-800/60 backdrop-blur-sm hover:bg-blue-900/50 border border-gray-700 rounded-lg p-6 transition-all duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg"
              >
                <h2 className="text-2xl font-bold text-blue-300">{p.title}</h2>
                <p className="text-gray-400 mt-2">{p.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
       <footer className="absolute bottom-4 text-center text-gray-500 text-sm">
        <p>이 페이지는 Gemini와 함께 만들었습니다.</p>
      </footer>
    </div>
  );
}

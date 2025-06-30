// src/App.jsx

import { useState } from 'react';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt) return;

    setIsLoading(true);
    setResponse('');
    setError('');

    try {
      const apiEndpoint = 'https://YOUR_API_GATEWAY_ENDPOINT_URL/prod/chat';
      
      console.log('Sending POST request to:', apiEndpoint);
      console.log('Body:', JSON.stringify({ prompt }));
      await new Promise(resolve => setTimeout(resolve, 1500));
      const dummyResponse = `これは「${prompt}」に対するClaude 3.5 Sonnetからのダミーの応答です。実際のAPIに接続すると、AIが生成したテキストがここに表示されます。`;
      setResponse(dummyResponse);

    } catch (err) {
      setError(err.message || '不明なエラーが発生しました。');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // ↓↓↓ このdivがポイント！画面全体を背景色で覆い、中の要素を中央に配置します ↓↓↓
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      
      {/* ↓↓↓ これが中央に配置されるコンテンツ本体のコンテナです ↓↓↓ */}
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        
        {/* タイトルと説明文はテキストを中央寄せに */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Chat with Claude 3.5 Sonnet
        </h1>


        <form onSubmit={handleSubmit}>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="ここにメッセージを入力..."
            className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !prompt}
            className="w-full mt-4 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
          >
            {isLoading ? '送信中...' : 'POSTリクエストを送信'}
          </button>
        </form>

        {(response || error || isLoading) && (
          <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">応答結果</h2>
            {isLoading && <p className="text-gray-600 animate-pulse">AIが応答を生成しています...</p>}
            {error && <p className="text-red-500 whitespace-pre-wrap">{error}</p>}
            {response && <p className="text-gray-800 whitespace-pre-wrap">{response}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
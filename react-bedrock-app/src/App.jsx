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

    // --- [LOG 1] ---
    // フォーム送信が開始されたことをログに出力
    console.log('🚀 フォーム送信開始...');
    
    setIsLoading(true);
    setResponse('');
    setError('');

    try {
      const apiEndpoint = 'https://ct58vde5v8.execute-api.ap-northeast-1.amazonaws.com/prod/chat';
      const requestBody = { prompt: prompt };

      // --- [LOG 2] ---
      // どのURLに、どんなデータを送るのかをログに出力
      console.log(`📡 APIリクエスト送信:
      - エンドポイント: ${apiEndpoint}
      - メソッド: POST
      - ボディ:`, requestBody);

      const res = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      // --- [LOG 3] ---
      // APIからの生のレスポンスオブジェクトをログに出力
      console.log('📬 APIレスポンス受信:', res);

      if (!res.ok) {
        // HTTPステータスがエラーの場合、エラーを発生させる
        throw new Error(`APIエラー: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      
      // --- [LOG 4] ---
      // JSONパース後のデータをログに出力（これが最終的な応答データ）
      console.log('✅ 応答データ:', data);

      setResponse(data);

    } catch (err) {
      // --- [LOG 5] ---
      // エラーが発生した場合、その内容をコンソールにエラーとして出力
      console.error('❌ エラー発生:', err);
      setError(err.message || '不明なエラーが発生しました。');

    } finally {
      // --- [LOG 6] ---
      // 処理が完了したことをログに出力
      console.log('🏁 処理完了');
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
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
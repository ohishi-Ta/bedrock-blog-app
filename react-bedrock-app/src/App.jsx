// src/App.jsx

import { useState } from 'react';

function App() {
  // ユーザーの入力テキストを管理するState
  const [prompt, setPrompt] = useState('');
  // APIからの応答を管理するState
  const [response, setResponse] = useState('');
  // ローディング状態を管理するState
  const [isLoading, setIsLoading] = useState(false);
  // エラーメッセージを管理するState
  const [error, setError] = useState('');

  // フォーム送信時の処理
  const handleSubmit = async (e) => {
    e.preventDefault(); // ページの再読み込みを防ぐ
    if (!prompt) return; // 入力が空なら何もしない

    setIsLoading(true);
    setResponse('');
    setError('');

    try {
      // ここにあなたのAPI GatewayのエンドポイントURLを設定します
      const apiEndpoint = 'https://YOUR_API_GATEWAY_ENDPOINT_URL/prod/chat';
      
      // 実際には上記のURLにリクエストしますが、ここではダミーの処理をします
      // --- ダミー処理 ここから ---
      console.log('Sending POST request to:', apiEndpoint);
      console.log('Body:', JSON.stringify({ prompt }));
      await new Promise(resolve => setTimeout(resolve, 1500)); // 1.5秒待つ
      const dummyResponse = `これは「${prompt}」に対するClaude 3.5 Sonnetからのダミーの応答です。実際のAPIに接続すると、AIが生成したテキストがここに表示されます。`;
      setResponse(dummyResponse);
      // --- ダミー処理 ここまで ---

      /*
      // ▼ 実際のAPIに接続する場合は、以下のコメントを解除してください ▼
      const res = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      if (!res.ok) {
        throw new Error(`APIエラーが発生しました: ${res.statusText}`);
      }

      const data = await res.json();
      setResponse(data.body); // Lambdaからの応答をセット
      */

    } catch (err) {
      setError(err.message || '不明なエラーが発生しました。ダミーURLのままかもしれません。');
      console.error(err);
    } finally {
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
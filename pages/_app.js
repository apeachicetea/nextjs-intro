//Next.js 모든 컴포넌트를 렌더링할 때 Component인자에 거쳐서 App의 리턴 값이 렌더링이 된다

import Layout from "../components/Layout";
{
  /* global style 적용 방법 1 */
}
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      {/* 이 Layout 사이에다가 작성된 모든 코드는 Layout의 children으로 가게 된다 */}
      <Component {...pageProps} />
    </Layout>
  );
}

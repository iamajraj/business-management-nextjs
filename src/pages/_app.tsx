import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import StateSetter from "../components/StateSetter";
import Navigator from "../components/Navigator";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <StateSetter>
        <Navigator>
          <Component {...pageProps} />
        </Navigator>
      </StateSetter>
    </RecoilRoot>
  );
}

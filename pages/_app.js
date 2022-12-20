import "../src/components/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../src/app/store";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <Provider store={store}>
      <SessionProvider session={session} refetchInterval={5 * 60}>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}

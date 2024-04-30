import React from "react";
import { createTheme, ThemeProvider, Theme } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";

// Consuming the outer theme is only required with coexisting themes, like in this documentation.
// If your app/website doesn't deal with this, you can have just:
// const theme = createTheme({ direction: 'rtl' })
const theme = (outerTheme: Theme) => {
  console.log(outerTheme);
  return createTheme({
    direction: "rtl",
  });
};

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const store = createStore({
  authName: "_auth_pos",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider store={store}>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </CacheProvider>
    </AuthProvider>
  );
}

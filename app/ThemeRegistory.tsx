"use client";

import { CacheProvider } from "@emotion/react";
import { ThemeProvider, createTheme, CssBaseline, useMediaQuery } from "@mui/material";
import createCache from "@emotion/cache";
import React, { useMemo } from "react";

// スタイルキャッシュ
const cache = createCache({ key: "mui", prepend: true });

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  // OS のダークモード設定を取得
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  // OS の設定に基づいたテーマを作成
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}

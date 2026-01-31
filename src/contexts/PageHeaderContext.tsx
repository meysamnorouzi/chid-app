import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

export interface PageHeaderConfig {
  greeting?: string;
  subtitle: string;
  showCartBadge?: boolean;
  icon?: ReactNode;
}

interface PageHeaderContextValue {
  config: PageHeaderConfig;
  setConfig: (config: Partial<PageHeaderConfig>) => void;
}

/** User name and username — shown on all pages in profile bar */
const defaultConfig: PageHeaderConfig = {
  greeting: "محمد مهرابی",
  subtitle: "@mohammad-mehrabi",
};

const PageHeaderContext = createContext<PageHeaderContextValue | null>(null);

/** Paths that show cart badge in profile bar */
const CART_BADGE_PATHS = ["/shop", "/cart", "/favorites"];

function getConfigForPath(pathname: string): PageHeaderConfig {
  const showCartBadge =
    CART_BADGE_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/")) ||
    pathname.startsWith("/shop/");
  return {
    ...defaultConfig,
    showCartBadge,
  };
}

export function PageHeaderProvider({
  pathname,
  children,
}: {
  pathname: string;
  children: ReactNode;
}) {
  const [config, setConfigState] = useState<PageHeaderConfig>(
    () => getConfigForPath(pathname)
  );

  useEffect(() => {
    setConfigState(getConfigForPath(pathname));
  }, [pathname]);

  const setConfig = useCallback((updates: Partial<PageHeaderConfig>) => {
    setConfigState((prev) => ({ ...prev, ...updates }));
  }, []);

  return (
    <PageHeaderContext.Provider value={{ config, setConfig }}>
      {children}
    </PageHeaderContext.Provider>
  );
}

export function usePageHeader() {
  return useContext(PageHeaderContext)?.config ?? defaultConfig;
}

export function useSetPageHeader() {
  return useContext(PageHeaderContext)?.setConfig ?? (() => {});
}

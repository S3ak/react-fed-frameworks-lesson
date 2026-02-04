import { Suspense, cache, use } from "react";
import AppStateContext from "./shellService";
import type { InitialState, User } from "../../types";
import { ErrorBoundary } from "../error-boundary/ErrorBoundary";

const getCachedInitialState = cache(getInitialState);

export default function ShellHOC({ children }: { children: React.ReactNode }) {
  const defaultState: InitialState = use(getCachedInitialState());

  return (
    <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
      <Suspense fallback={<p>⌛Downloading message...</p>}>
        <AppStateContext.Provider value={defaultState}>
          {children}
        </AppStateContext.Provider>
      </Suspense>
    </ErrorBoundary>
  );
}

async function getInitialState(): Promise<InitialState> {
  // #TODO: Should initial get retrieved from localstorage?
  return {
    user: {} as User,
  };
}

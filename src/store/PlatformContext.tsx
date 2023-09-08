import {
  type ReactNode,
  type Dispatch,
  createContext,
  useReducer,
  useContext,
} from "react";

// Initial state
const initialState = {
  currentPlatform: "",
};

// Context
export const PlatformContext = createContext(initialState);
export const PlatformDispatchContext =
  createContext<Dispatch<ACTIONTYPE> | null>(null);

// Hooks
export const usePlatform = () => {
  return useContext(PlatformContext);
};

export const usePlatformDispatch = () => {
  const platformDispatchContext = useContext(PlatformDispatchContext);

  if (!platformDispatchContext) {
    throw new Error("Provide argument for custom hook");
  }
  return platformDispatchContext;
};

// Provider Wrapper
export function PlatformProvider({ children }: { children: ReactNode }) {
  const [platform, dispatch] = useReducer(platformReducer, initialState);

  return (
    <PlatformContext.Provider value={platform}>
      <PlatformDispatchContext.Provider value={dispatch}>
        {children}
      </PlatformDispatchContext.Provider>
    </PlatformContext.Provider>
  );
}

type ACTIONTYPE = {
  type: "platform";
  payload: { currentPlatform: "Tiktok" | "Bigo" | "Meta" };
};

// Reducer function
function platformReducer(platform: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case "platform": {
      return { ...platform, currentPlatform: action.payload.currentPlatform };
    }

    default:
      return initialState;
  }
}

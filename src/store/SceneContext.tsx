import {
  type ReactNode,
  type Dispatch,
  createContext,
  useReducer,
  useContext,
} from "react";

// Initial state
const initialScene = {
  scroll: false,
  pause: false,
  companyIsChosen: false,
  sceneIsCreated: false,
};

// Context
export const SceneContext = createContext(initialScene);
export const SceneDispatchContext = createContext<Dispatch<ACTIONTYPE> | null>(
  null
);

// Hooks
export const useScene = () => {
  return useContext(SceneContext);
};

export const useSceneDispatch = () => {
  const sceneDispatchContext = useContext(SceneDispatchContext);

  if (!sceneDispatchContext) {
    throw new Error("Provide argument for custom hook");
  }
  return sceneDispatchContext;
};

// Provider Wrapper
export function SceneProvider({ children }: { children: ReactNode }) {
  const [scene, dispatch] = useReducer(sceneReducer, initialScene);

  return (
    <SceneContext.Provider value={scene}>
      <SceneDispatchContext.Provider value={dispatch}>
        {children}
      </SceneDispatchContext.Provider>
    </SceneContext.Provider>
  );
}

type ACTIONTYPE =
  | { type: "scroll"; payload: { scroll: boolean } }
  | { type: "pause"; payload: { pause: boolean } }
  | { type: "companyIsChosen"; payload: { companyIsChosen: boolean } }
  | { type: "sceneIsCreated"; payload: { sceneIsCreated: boolean } };

// Reducer function
function sceneReducer(scene: typeof initialScene, action: ACTIONTYPE) {
  switch (action.type) {
    case "scroll": {
      return { ...scene, scroll: action.payload.scroll };
    }

    case "pause": {
      return { ...scene, pause: action.payload.pause };
    }

    case "companyIsChosen": {
      return { ...scene, companyIsChosen: action.payload.companyIsChosen };
    }
    case "sceneIsCreated": {
      return { ...scene, sceneIsCreated: action.payload.sceneIsCreated };
    }

    default:
      return initialScene;
  }
}

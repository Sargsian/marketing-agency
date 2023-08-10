import {
  type ReactNode,
  type Dispatch,
  type RefObject,
  createContext,
  useReducer,
  useContext,
} from "react";
import { type Group } from "three";

// Initial state
const initialScene = {
  scroll: false,
  preview: false,
  pause: false,
  companyIsChosen: false,
  sunRef: null,
} as {
  scroll: boolean;
  preview: boolean;
  pause: boolean;
  companyIsChosen: boolean;
  sunRef: null | RefObject<Group>;
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
  | { type: "preview"; payload: { preview: boolean } }
  | { type: "pause"; payload: { pause: boolean } }
  | { type: "companyIsChosen"; payload: { companyIsChosen: boolean } }
  | { type: "sunRef"; payload: { sunRef: RefObject<Group> } };

// Reducer function
function sceneReducer(scene: typeof initialScene, action: ACTIONTYPE) {
  switch (action.type) {
    case "scroll": {
      return { ...scene, scroll: action.payload.scroll };
    }
    case "preview": {
      return { ...scene, preview: action.payload.preview };
    }
    case "pause": {
      return { ...scene, pause: action.payload.pause };
    }

    case "companyIsChosen": {
      return { ...scene, companyIsChosen: action.payload.companyIsChosen };
    }

    case "sunRef": {
      return { ...scene, sunRef: action.payload.sunRef };
    }

    default:
      return initialScene;
  }
}

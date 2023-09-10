import { Environment, useEnvironment, useTexture } from "@react-three/drei";

const SceneEnvironment = () => {
  const envMap = useEnvironment({ files: "/assets/models/galaxy.hdr" });

  return <Environment background map={envMap} />;
};

export default SceneEnvironment;

useTexture.preload("/assets/models/galaxy.hdr");

import { Environment, useEnvironment } from "@react-three/drei";

const SceneEnvironment = ({ url }: { url: string }) => {
  const envMap = useEnvironment({ files: url });

  return <Environment background map={envMap} />;
};

export default SceneEnvironment;

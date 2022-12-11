import { githubIntegration } from "./github";
import type { Integration, RecordInput } from "./interfaces";

const integrations: Integration[] = [githubIntegration()];

export const collectIntegrationRecordInputs = async (): Promise<
  RecordInput[]
> => {
  const inputs = await Promise.all(
    integrations.map(({ collect }) => collect())
  );
  console.dir({ inputs }, { depth: null });
  return inputs.flat();
};

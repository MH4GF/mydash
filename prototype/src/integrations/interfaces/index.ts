// TODO: 必要があればちゃんとした型定義をする
type Url = string;
export type IntegrationType = string;

export type RecordInput = {
  type: IntegrationType;
  name: string;
  url: Url;
};

export interface Integration {
  collect: () => Promise<RecordInput[]>;
}

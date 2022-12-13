import type { IntegrationType } from "@app/integrations/interfaces";

type InitialRecords = Record<IntegrationType, string>[];
type Result = Record<IntegrationType, { id: string }[]>;

export const getRelationOfIntegrationRecordsProperties = (
  records: InitialRecords
): Result => {
  const result: Result = {};
  records.forEach((record) => {
    const keys = Object.keys(record);
    keys.forEach((key) => {
      const id = record[key]!;
      const values = result[key];
      if (values) {
        result[key] = [...values, { id }];
      } else {
        result[key] = [{ id }];
      }
    });
  });

  return result;
};

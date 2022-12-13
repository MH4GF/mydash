import type { IntegrationType } from "@app/integrations/interfaces";
import type { Records } from "./mapTypeAndIdFromIntegrationRecords";

type Result = Record<IntegrationType, { id: string }[]>;

export const getRelationOfIntegrationRecordsProperties = (
  records: Records
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

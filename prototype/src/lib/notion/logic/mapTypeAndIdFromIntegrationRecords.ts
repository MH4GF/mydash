import type { IntegrationType } from "@app/integrations/interfaces";
import { integrationsDatabaseColumns } from "../constants";
import type { PageObject } from "../type";

export type Records = Record<IntegrationType, string>[];

export const mapTypeAndIdFromIntegrationRecords = (
  pages: PageObject[]
): Records => {
  return pages.map((page) => {
    if (!("properties" in page))
      throw new Error("Invalid page: properties is not found");
    const column =
      page.properties[integrationsDatabaseColumns.Integration.name];
    if (!column)
      throw new Error("Invalid page: Integration property is not found");
    if (column.type !== "select")
      throw new Error(`Invalid type: ${column.type} is not select`);
    if (!column.select) throw new Error("Invalid column: column is empty");

    const type = column.select.name;
    return {
      [type]: page.id,
    };
  });
};

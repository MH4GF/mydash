import type {
  PageObjectResponse,
  PartialPageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export type PageObject = PageObjectResponse | PartialPageObjectResponse;

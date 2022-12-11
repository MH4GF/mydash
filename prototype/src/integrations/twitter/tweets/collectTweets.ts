import type { RecordInput } from "@app/integrations/interfaces";
import { client } from "../client";
import { integrationType } from "../constants";
import { fetchTweets } from "./fetchTweets";
import { tweetUrlFromId } from "./logic/tweetUrlFromId";

export const collectTweets = async (): Promise<RecordInput[]> => {
  const tweets = await fetchTweets(client());
  if (!tweets) return [];

  return tweets.map(({ text, id }) => ({
    name: text,
    url: tweetUrlFromId(id),
    type: integrationType,
  }));
};

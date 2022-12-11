import { startOfDay, formatISO, subSeconds } from "@app/lib/dateFns";
import type Client from "twitter-api-sdk";

export const fetchTweets = async (client: Client) => {
  const tweets = await client.tweets.tweetsRecentSearch({
    query: "from:MH4GF",
    start_time: formatISO(startOfDay(new Date())),
    // Twitter APIは現在時刻より10秒前以下でクエリする必要がある 安全をとって30秒前にしている
    end_time: formatISO(subSeconds(new Date(), 30)),
    "tweet.fields": ["created_at", "text", "id"],
  });
  console.dir({ tweets }, { depth: null });

  return tweets.data;
};

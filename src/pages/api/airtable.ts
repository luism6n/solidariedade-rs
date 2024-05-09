// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  sheet: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = await fetch(
    "https://airtable.com/v0.3/view/viwN5plNvxMlo0EKg/readSharedViewData?stringifiedObjectParams=%7B%22shouldUseNestedResponseFormat%22%3Atrue%7D&requestId=reqzUkN6XIa4nkeeF&accessPolicy=%7B%22allowedActions%22%3A%5B%7B%22modelClassName%22%3A%22view%22%2C%22modelIdSelector%22%3A%22viwN5plNvxMlo0EKg%22%2C%22action%22%3A%22readSharedViewData%22%7D%2C%7B%22modelClassName%22%3A%22view%22%2C%22modelIdSelector%22%3A%22viwN5plNvxMlo0EKg%22%2C%22action%22%3A%22getMetadataForPrinting%22%7D%2C%7B%22modelClassName%22%3A%22view%22%2C%22modelIdSelector%22%3A%22viwN5plNvxMlo0EKg%22%2C%22action%22%3A%22readSignedAttachmentUrls%22%7D%2C%7B%22modelClassName%22%3A%22row%22%2C%22modelIdSelector%22%3A%22rows%20*%5BdisplayedInView%3DviwN5plNvxMlo0EKg%5D%22%2C%22action%22%3A%22createDocumentPreviewSession%22%7D%5D%2C%22shareId%22%3A%22shrqtkYNgKFay2XJg%22%2C%22applicationId%22%3A%22appfQT2vfWc6sZRAx%22%2C%22generationNumber%22%3A0%2C%22expires%22%3A%222024-06-06T00%3A00%3A00.000Z%22%2C%22signature%22%3A%22a8d73b1f328bb54e3feb3780204b2360ad72cfe34e4b4cef4136e828893894de%22%7D",
    {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7",
        priority: "u=1, i",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-airtable-accept-msgpack": "true",
        "x-airtable-application-id": "appfQT2vfWc6sZRAx",
        "x-airtable-inter-service-client": "webClient",
        "x-airtable-page-load-id": "pglSfS773vuNuSRRR",
        "x-early-prefetch": "true",
        "x-requested-with": "XMLHttpRequest",
        "x-time-zone": "America/Sao_Paulo",
        "x-user-locale": "en",
        cookie:
          "brw=brwPILsZKE9CMFUkN; __Host-airtable-session=eyJzZXNzaW9uSWQiOiJzZXNpRUZtbTVPUlU3NTYyRCIsImNzcmZTZWNyZXQiOiJfcXE1THNEVkhaQmdTb0x1VENpeHJZa0kifQ==; __Host-airtable-session.sig=wXAqdRig7PFEk9AVWadOAyKzDqqeqlqk-XLRztZE06o; acq=eyJhY3F1aXNpdGlvbiI6Ilt7XCJwbGF0Zm9ybVwiOlwiZGVza3RvcFwiLFwib3JpZ2luXCI6XCJsb2dpblwiLFwidG91Y2hUaW1lXCI6XCIyMDI0LTA1LTA4VDE5OjExOjIyLjIxNVpcIn1dIiwicmVkaXJlY3RUb0FmdGVyTG9naW4iOiIvYXBwUEFNTXNsclRabzY2Zk8ifQ==; acq.sig=-04jpP6dBqdg1W8zacsRux4kir43gxvwWu09Gt8EWHE; _hly_vid=b456111a-8384-4fa7-9422-36f3aba39d59; brwConsent=opt-in; OptanonConsent=isGpcEnabled=0&datestamp=Thu+May+09+2024+19%3A18%3A24+GMT-0300+(Brasilia+Standard+Time)&version=202308.2.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=31339386-02d4-41fc-a0e7-8bb389edc759&interactionCount=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CC0007%3A1%2CC0003%3A1%2CC0004%3A1&AwaitingReconsent=false&isAnonUser=1; AWSALB=kqIYtLlYW/6rK6wyL0YpBYkTR1J6HJbLSPkPsytu32P5xAu7+40SNqG30ZbHQcdVfpqyswCK4406jHJ8e9kALKUui0vbhnBisOmBaKNmwOrxDqigVStscpoWbjqJ; AWSALBCORS=kqIYtLlYW/6rK6wyL0YpBYkTR1J6HJbLSPkPsytu32P5xAu7+40SNqG30ZbHQcdVfpqyswCK4406jHJ8e9kALKUui0vbhnBisOmBaKNmwOrxDqigVStscpoWbjqJ",
      },
      referrerPolicy: "no-referrer",
      body: null,
      method: "GET",
    }
  );

  res.send({ sheet: await data.json() });
}

import { nanoid } from "nanoid";
import { URL } from "../models/url.js";

async function handleGenerateShortUrl(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ error: "URL is required" });
  }
  const shortId = nanoid(6);
  await URL.create({
    shortId,
    redirectUrl: body.url,
    visitedHistory: [],
  });

  return res.json({ id: shortId });
}

async function handleGetRedirectUrl(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
    { new: true }
  );
  res.redirect(entry.redirectUrl);
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory 
    })
}

export { handleGenerateShortUrl, handleGetRedirectUrl , handleGetAnalytics};

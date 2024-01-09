import URL from "../models/url.js";
import shortid from "shortid";

export const getShortID = async (req, res) => {
  try {
    const { longUrl } = req.body;
    if (!longUrl) return res.status(400).json({ error: "URL required" });
    const shortId = shortid.generate();
    const newURL = new URL({
      shortId,
      longUrl,
    });
    // console.log(newURL)
    const savedUrl = await newURL.save();
    res.status(200).json(savedUrl);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const visitSite = async (req, res) => {
  try {
    const { shortId } = req.params;
    const findUrl = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visited: Date.now() } },
      { new: true }
    );

    if (!findUrl) return res.status(400).json({ error: "URL is not found" });

    console.log(findUrl.longUrl);
    res.redirect(findUrl.longUrl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const analyticsofhit = async (req, res) => {
  const { shortId } = req.params;
  const findUrl = await URL.findOne({ shortId });

  if (!findUrl) return res.status(400).json({ error: "URL is not found" });
  res
    .status(200)
    .json({ visited: findUrl.visited.length, time: findUrl.visited });
};

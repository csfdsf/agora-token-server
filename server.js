const express = require("express");
const cors = require("cors");
const { RtcTokenBuilder, RtcRole } = require("agora-access-token");

const app = express();
app.use(cors());

const APP_ID = "0b9280f62d4b43a5834a5312a0cb6680";
const APP_CERTIFICATE = "a3558451adb0468d8ab078e567411a0d";

app.get("/rtc-token", (req, res) => {
  const channelName = req.query.channelName;
  if (!channelName) {
    return res.status(400).json({ error: "channelName is required" });
  }

  const uid = 0;
  const role = RtcRole.PUBLISHER;
  const expireTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpireTs = currentTimestamp + expireTimeInSeconds;

  const token = RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channelName,
    uid,
    role,
    privilegeExpireTs
  );

  return res.json({ token });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Token server running on http://localhost:${PORT}`);
});

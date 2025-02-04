// import axios from "axios";

// export default async function handler(req, res) {
//   const { code } = req.query;
//   if (!code) return res.status(400).json({ error: "No authorization code provided" });

//   try {
//     // Exchange code for an access token
//     const tokenResponse = await axios.post("https://api.instagram.com/oauth/access_token", null, {
//       params: {
//         client_id: "630237526143918",
//         client_secret: "da85fe73f6e7241dac0da2835149aa18",
//         grant_type: "authorization_code",
//         redirect_uri: "http://localhost:3000",
//         code
//       },
//     });

//     const { access_token, user_id } = tokenResponse.data;

//     // Fetch user profile
//     const userProfile = await axios.get(`https://graph.instagram.com/${user_id}`, {
//       params: { fields: "id,username", access_token },
//     });

//     // Fetch user posts
//     const userMedia = await axios.get(`https://graph.instagram.com/${user_id}/media`, {
//       params: { fields: "id,caption,media_type,media_url,timestamp", access_token },
//     });

//     return res.json({
//       user: userProfile.data,
//       posts: userMedia.data.data,
//     });
//   } catch (error) {
//     console.error("Instagram Auth Error:", error.response?.data || error.message);
//     return res.status(500).json({ error: "Authentication failed" });
//   }
// }

import axios from "axios";

export default async function handler(req, res) {
  const { code } = req.query;
  if (!code) return res.status(400).json({ error: "No authorization code provided" });

  try {
    // Exchange code for an access token
    const tokenResponse = await axios.post("https://api.instagram.com/oauth/access_token", null, {
      params: {
        client_id: "630237526143918",
        client_secret: "da85fe73f6e7241dac0da2835149aa18",
        grant_type: "authorization_code",
        redirect_uri: "http://localhost:3000/", // Ensure this matches Instagram's settings
        code,
      },
    });

    const { access_token, user_id } = tokenResponse.data;

    // Redirect to the home page with the access token (Optional: You can store it in cookies instead)
    res.redirect(`/home?access_token=${access_token}&user_id=${user_id}`);
  } catch (error) {
    console.error("Instagram Auth Error:", error.response?.data || error.message);
    return res.status(500).json({ error: "Authentication failed" });
  }
}

import axios from "axios";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    if (!code) {
      return new Response(
        JSON.stringify({ error: "No authorization code providedss" }),
        { status: 400 }
      );
    }

    console.log("967203745507226");

    // Step 1: Exchange code for an access token
    const tokenResponse = await axios.post("https://api.instagram.com/oauth/access_token", 
      new URLSearchParams({
        client_id: "967203745507226",
        client_secret: "da85fe73f6e7241dac0da2835149aa18",
        grant_type: "authorization_code",
        redirect_uri: "https://instagram-08di.onrender.com/api/auth",
        code,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    const { access_token, user_id } = tokenResponse.data;

    console.log("Instagram OAuth: Fetching user profile...");

    // Step 2: Fetch user profile data
    const userProfile = await axios.get(`https://graph.instagram.com/${user_id}`, {
      params: { fields: "id,username", access_token },
    });

    console.log("Instagram OAuth: Fetching user media...");

    // Step 3: Fetch user posts/media
    const userMedia = await axios.get(`https://graph.instagram.com/${user_id}/media`, {
      params: { fields: "id,caption,media_type,media_url,timestamp", access_token },
    });

    console.log("Instagram OAuth: Success!");

    // ✅ Return user data as JSON
    return new Response(
      JSON.stringify({
        user: userProfile.data,
        media: userMedia.data,
        access_token,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Instagram OAuth Error:", error.response?.data || error.message);

    return new Response(
      JSON.stringify({ error: "Authentication failed", details: error.response?.data || error.message }),
      { status: 500 }
    );
  }
}

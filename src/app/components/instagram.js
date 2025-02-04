const CLIENT_ID = "967203745507226";
const REDIRECT_URI = "http://localhost:3000/api/auth/instagram";  // Use the exact redirect URI from Meta Developer Dashboard

const handleLogin = () => {
  const authUrl = `https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=instagram_business_basic,instagram_business_manage_messages,instagram_business_manage_comments,instagram_business_content_publish,instagram_business_manage_insights`;

  window.location.href = authUrl; // Redirect user to Instagram login page
};


export default function HomePage() {
  return (
    <div>
      <h1>Instagram Login</h1>
      <button onClick={handleLogin}>Login with Instagram</button>
    </div>
  );
}

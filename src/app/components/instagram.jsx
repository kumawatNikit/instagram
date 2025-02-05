const CLIENT_ID = "522101310993559";
const REDIRECT_URI = "https://instagram-08di.onrender.com/api/auth";  

const handleLogin = () => {
  const authUrl = `https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=522101310993559&redirect_uri=https://instagram-08di.onrender.com/api/auth&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights`;

  window.location.href = authUrl;
};


export default function HomePage() {
  return (
    <div>
      <h1>Instagram Login</h1>
      <button onClick={handleLogin}>Login with Instagram</button>
    </div>
  );
}
// import { signIn } from "next-auth/react";

// export default function LoginButton() {
//   return (
//     <button onClick={() => signIn("instagram")}>
//       Sign in
//     </button>
//   );
// }

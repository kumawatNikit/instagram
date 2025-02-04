export default function InstagramLogin() {
    const CLIENT_ID = "630237526143918";
    const REDIRECT_URI = "http://localhost:3000/"; 
  
    const loginWithInstagram = () => {
      const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;
      window.location.href = authUrl;
    };
  
    return <button onClick={loginWithInstagram}>Login with Instagram</button>;
  }
  
"use client"
import { useEffect, useState } from "react";
import InstagramLogin from "./components/instagram";

export default function Home() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      fetch(`/api/auth/instagram?code=${code}`)
        .then((res) => res.json())
        .then((data) => setUserData(data));
        console.log(data, "data")
    }
  }, []);

  return (
    <div>
      {!userData ? (
        <InstagramLogin />
      ) : (
        <div>
          <h2>Welcome, {userData.user.username}</h2>
          <h3>Your Posts:</h3>
          {userData.posts.map((post) => (
            <div key={post.id}>
              <p>{post.caption}</p>
              {post.media_type === "IMAGE" && <img src={post.media_url} alt="Post" width="200" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client"
import { useEffect, useState } from "react";
import InstagramLogin from "./components/instagram";

export default function Home() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access_token");
    const userId = params.get("user_id");

    if (accessToken && userId) {
      fetch(`/api/auth/instagram?access_token=${accessToken}&user_id=${userId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setUserData(data);
          }
        })
        .catch((err) => {
          setError("Something went wrong while fetching data.");
          console.error(err);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false); // If no access token, stop loading
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {!userData ? (
        <InstagramLogin />
      ) : (
        <div>
          <h2>Welcome, {userData.user.username}</h2>
          <h3>Your Posts:</h3>
          {userData.posts.length === 0 ? (
            <p>You have no posts yet!</p>
          ) : (
            userData.posts.map((post) => (
              <div key={post.id}>
                <p>{post.caption}</p>
                {post.media_type === "IMAGE" && (
                  <img src={post.media_url} alt="Post" width="200" />
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

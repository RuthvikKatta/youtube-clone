import { useEffect, useState } from "react";
import { VideoGridItem } from "../Components/VideoGridItem";
import { FetchVideoProps, VideoProps } from "../types/VideoProps";

export default function VideoGrid() {
  const [videoData, setVideoData] = useState<FetchVideoProps[]>([]);
  const [finalVideoData, setFinalVideoData] = useState<VideoProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [maxResults] = useState(24);

  useEffect(() => {
    setFinalVideoData([]);

    // fetch("http://localhost:9000/allVideos")
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setFinalVideoData(data);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     if (error.message === "Network response was not ok") {
    //       console.log("Failed to fetch data: Network response was not ok");
    //     } else {
    //       console.log("Failed to fetch data:", error);
    //     }
    //   });

    fetch(
      "https://youtube.googleapis.com/youtube/v3/videos?" +
        new URLSearchParams({
          key: "AIzaSyBZrAH8Ku2t2E1w3h5FvDf6FsbO9TTI9Uk",
          part: "snippet, statistics, contentDetails, player",
          chart: "mostPopular",
          regionCode: "IN",
          maxResults: maxResults.toString(),
        })
    )
      .then((response) => {
        if (!response.ok) {
          if (response.status === 403) {
            throw new Error(
              "Forbidden: You don't have access to this resource."
            );
          } else if (response.status === 404) {
            throw new Error("Not Found: The requested resource was not found.");
          } else {
            throw new Error("Failed to fetch data. Status: " + response.status);
          }
        }
        return response.json();
      })
      .then((data) => {
        setVideoData(data.items);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const videoObjects = [];

      for (let i = 0; i < videoData.length; i++) {
        const video = videoData[i];
        const channelResponse = await fetch(
          "https://www.googleapis.com/youtube/v3/channels?" +
            new URLSearchParams({
              key: "AIzaSyBZrAH8Ku2t2E1w3h5FvDf6FsbO9TTI9Uk",
              part: "snippet, statistics",
              id: video.snippet.channelId,
            })
        );

        if (channelResponse.ok) {
          const channelData = await channelResponse.json();
          const videoObject = {
            id: video.id,
            title: video.snippet.title,
            views: parseInt(video.statistics.viewCount),
            postedAt: video.snippet.publishedAt,
            duration: video.contentDetails.duration,
            thumbnailUrl: video.snippet.thumbnails.maxres
              ? video.snippet.thumbnails.maxres.url
              : video.snippet.thumbnails.high.url,
            videoUrl: video.snippet.thumbnails.maxres
              ? video.snippet.thumbnails.maxres.url
              : video.snippet.thumbnails.high.url,
            channel: {
              id: channelData.items[0].id,
              name: channelData.items[0].snippet.title,
              verified:
                channelData.items[0].statistics.subscriberCount > 100000,
              profileUrl: channelData.items[0].snippet.thumbnails.high.url,
            },
          };

          videoObjects.push(videoObject);
        }

        if(i == videoData.length - 1) {
          setLoading(false);
        }
      }

      setFinalVideoData(videoObjects);
    };

    fetchData();
  }, [videoData]);

  return loading ? (
    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(325px,1fr))]">
      {Array.from({ length: maxResults }).map((_, index) => (
        <div key={index} className="flex flex-col gap-2 w-15">
          <div className="w-full h-48 rounded-lg swipe"></div>
          <div className="flex gap-2 items-center">
            <div className="w-12 h-10 rounded-full box-border swipe"></div>
            <div className="flex flex-col w-full gap-1">
              <div className="w-full h-4 rounded-sm swipe"></div>
              <div className="w-6/12 h-3 rounded-sm swipe"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(325px,1fr))]">
      {finalVideoData.map((video) => (
        <VideoGridItem key={video.id} {...video} />
      ))}
    </div>
  );
}

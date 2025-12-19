"use client";
import React from "react";
import { Modal } from "react-responsive-modal";
import ReactPlayer from "react-player";

interface VideoPopupProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
}

const VideoPopup: React.FC<VideoPopupProps> = ({ isOpen, onClose, videoId }) => {
  if (!videoId) return null;

  // URL mi yoksa YouTube ID mi kontrol et
  const videoUrl = videoId.startsWith('http')
    ? videoId
    : `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <Modal open={isOpen} onClose={onClose} center classNames={{ modal: "video-modal" }}>
      <div style={{ width: "100%", minWidth: "300px", aspectRatio: "16/9", background: "#000" }}>
        <ReactPlayer
          {...({
            url: videoUrl,
            playing: true,
            controls: true,
            width: "100%",
            height: "100%",
            onError: (e: any) => console.error("Error playing video:", e)
          } as any)}
        />
      </div>
    </Modal>
  );
};

export default VideoPopup;

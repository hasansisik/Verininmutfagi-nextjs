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
  const isUrl = videoId?.startsWith('http');
  const videoUrl = videoId
    ? (isUrl ? videoId : `https://www.youtube.com/watch?v=${videoId}`)
    : "";

  return (
    <Modal open={isOpen} onClose={onClose} center classNames={{ modal: "video-modal" }}>
      <div style={{ width: "100%", minWidth: "300px", aspectRatio: "16/9", background: "#000", overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {isOpen && videoId && (
          isUrl ? (
            <video
              key={videoUrl}
              src={videoUrl}
              controls
              autoPlay
              playsInline
              style={{ width: '100%', height: '100%', display: 'block' }}
            />
          ) : (
            <ReactPlayer
              key={videoUrl}
              {...({
                url: videoUrl,
                playing: true,
                controls: true,
                width: "100%",
                height: "100%",
                config: {
                  youtube: {
                    playerVars: { autoplay: 1, rel: 0 }
                  }
                }
              } as any)}
            />
          )
        )}
      </div>
    </Modal>
  );
};

export default VideoPopup;

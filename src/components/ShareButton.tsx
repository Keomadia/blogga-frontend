import React, { useState } from "react";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  Tooltip,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import CloseIcon from "@mui/icons-material/Close";
import {  FaXTwitter, FaWhatsapp,FaInstagram, FaDiscord , FaTiktok } from "react-icons/fa6";

interface ShareButtonProps {
  title: string;
  description: string;
  id: number;
}

const ShareButton: React.FC<ShareButtonProps> = ({ title, description, id }) => {
  const [open, setOpen] = useState(false);

  const url = `${window.location.origin}/blog/${id}`;
  const shareText = encodeURIComponent(description);
  const shareUrl = encodeURIComponent(url);

  const platforms = [
    {
      name: "WhatsApp",
      url: `https://wa.me/?text=${shareUrl}`,
      icon: <FaWhatsapp size={32} color="#40bf3f" />,
    },
    {
      name: "Discord",
      url: `https://discord.com/channels/@me?url=${shareUrl}`,
      icon: <FaDiscord size={32} color="#5865F2" />,
    },
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`,
      icon: <FaXTwitter size={32} color="#000"  />,
    },
    {
      name: "Instagram",
      url: `https://www.instagram.com/?url=${shareUrl}`,
      icon: <FaInstagram size={32} color="#fe5dd3"  />,
    },
    {
      name: "TikTok",
      url: `https://www.tiktok.com/share?url=${shareUrl}`,
      icon: <FaTiktok size={32} color="#000000" />,
    },
  ];

  return (
    <>
      <IconButton aria-label="share" onClick={() => setOpen(true)}>
        <ShareIcon />
      </IconButton>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          Share: <strong>{title.slice(0, 25)}...</strong>
        </DialogTitle>

        <IconButton
          onClick={() => setOpen(false)}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Stack direction="row" spacing={2} justifyContent="center">
            {platforms.map((platform) => (
              <Tooltip title={platform.name} key={platform.name}>
                <IconButton
                  component="a"
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={platform.name}
                  sx={{
                    transition: "transform 0.4s ease",
                    "&:hover": {
                      transform: "scale(1.2)",
                      bgcolor: "#ccc",
                    },
                  }}
                >
                  {platform.icon}
                </IconButton>
              </Tooltip>
            ))}
          </Stack>
        
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShareButton;

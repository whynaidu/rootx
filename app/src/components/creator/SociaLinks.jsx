import React from "react";
import {
  FaTwitch,
  FaTiktok,
  FaFacebook,
  FaInstagram,
  FaTelegramPlane,
  FaYoutube,
  FaWhatsapp,
  FaTwitter,
  FaLinkedin,
  FaDribbble,
  FaPinterest,
  FaSnapchat,
  FaSpotify,
} from "react-icons/fa";
import { useEffect, useState } from "react";

export default function SociaLinks(props) {
  const [socialLinks, setSocial] = useState([]);
  useEffect(() => {
    setSocial(props.social);
  }, []);

  return (
    <>
      <div>
        <div className="my-6">
          <div className="w-full gap-6 lg:text-4xl text-3xl grid place-items-center grid-cols-5">
            <div>
              {socialLinks.facebook === null ? (
                <p></p>
              ) : (
                <a className="" target="_blank" href={socialLinks.facebook}>
                  <FaFacebook fontSize="inherit" />
                </a>
              )}
            </div>
            <div className="">
              {socialLinks.instagram === null ? (
                <p></p>
              ) : (
                <a
                  
                  target="_blank"
                  href={socialLinks.instagram}
                >
                  <FaInstagram fontSize="inherit" />
                </a>
              )}
            </div>
            <div>
              {socialLinks.linkedin === null ? (
                <p></p>
              ) : (
                <a  target="_blank" href={socialLinks.linkedin}>
                  <FaLinkedin fontSize="inherit" />
                </a>
              )}
            </div>
            <div>
              {socialLinks.snapchat === null ? (
                <p></p>
              ) : (
                <a  target="_blank" href={socialLinks.snapchat}>
                  <FaSnapchat />
                </a>
              )}
            </div>
            <div>
              {socialLinks.twitch === null ? (
                <p></p>
              ) : (
                <a  target="_blank" href={socialLinks.twitch}>
                  <FaTwitch fontSize="inherit" />
                </a>
              )}
            </div>

            <div>
              {socialLinks.youtube === null ? (
                <p></p>
              ) : (
                <a  target="_blank" href={socialLinks.youtube}>
                  <FaYoutube fontSize="inherit" />
                </a>
              )}
            </div>
            <div>
              {socialLinks.twitter === null ? (
                <p></p>
              ) : (
                <a  target="_blank" href={socialLinks.twitter}>
                  <FaTwitter fontSize="inherit" />
                </a>
              )}
            </div>

            <div>
              {socialLinks.pinterest === null ? (
                <p></p>
              ) : (
                <a
                  
                  target="_blank"
                  href={socialLinks.pinterest}
                >
                  <FaPinterest fontSize="inherit" />
                </a>
              )}
            </div>
            <div>
              {socialLinks.whatsapp === null ? (
                <p></p>
              ) : (
                <a  target="_blank" href={socialLinks.whatsapp}>
                  <FaWhatsapp fontSize="inherit" />
                </a>
              )}
            </div>
            <div>
              {socialLinks.tiktok === null ? (
                <p></p>
              ) : (
                <a  target="_blank" href={socialLinks.tiktok}>
                  <FaTiktok />
                </a>
              )}
            </div>
            <div>
              {socialLinks.dribble === null ? (
                <p></p>
              ) : (
                <a  target="_blank" href={socialLinks.dribble}>
                  <FaDribbble />
                </a>
              )}
            </div>
            <div>
              {socialLinks.spotify === null ? (
                <p></p>
              ) : (
                <a  target="_blank" href={socialLinks.spotify}>
                  <FaSpotify />
                </a>
              )}
            </div>
            <div>
              {socialLinks.telegram === null ? (
                <p></p>
              ) : (
                <a  target="_blank" href={socialLinks.telegram}>
                  <FaTelegramPlane fontSize="inherit" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

export default function Links(props) {
  const [linksData, setLinks] = useState([]);
  const [userEmail, setuserEmail] = useState("");

  const featuredLinks = linksData.filter((Link) => Link.featured);
  const nonfeaturedLinks = linksData.filter((Link) => !Link.featured);

  const allLinks = [...featuredLinks, ...nonfeaturedLinks];

  useEffect(() => {
    setLinks(props.links);
    setuserEmail(props.email);
  }, [props.links]);

  function clicked() {
    console.log(window.location);
    // alert(window.location)
  }
  async function linkClicked(linkid) {
    const LinkId = linkid;
    const linkClicked = await axios.post(
      `http://localhost:3001/api/linkClicked/${userEmail}/${LinkId}`
    );
  }

  return (
    <>
      {allLinks.map((element, c) => {
        console.log("live date:", element.live);
        const momentLive = moment(
          moment(element.live).format("MMMM Do YYYY, h:mm:ss a"),
          "MMMM Do YYYY, h:mm:ss a"
        );
        console.log("moment live:", momentLive.format());

        const momentExp = moment(
          moment(element.expiration).format("MMMM Do YYYY, h:mm:ss a"),
          "MMMM Do YYYY, h:mm:ss a"
        );
        console.log("moment expiration:", momentExp.format());

        console.log("current time:", moment().format());
        // console.log("live time:", momentLive.format());

        if (momentLive <= moment().format()) {
          console.log("trur");
        } else {
          console.log("fs");
        }
        if (momentExp >= moment()) {
          console.log("trur");
        } else {
          console.log("fs");
        }

        if (
          element.visible &&
          momentLive <= moment() &&
          (element.expiration === "null" || momentExp >= moment())
        ) {
          console.log("link:", element.linkUrl);
          return (
            <div key={c} className="hover:scale-110 delay-200 duration-200">
              <a
                href={element.linkUrl}
                target="_blank"
                onClick={() => linkClicked(element._id)}
              >
                <div className="flex w-full card px-1.5 py-1.5 hover:shadow-ixndigo-500/40 lg:max-w-full rounded-md">
                  <div className="border-1 h-14 w-16 rounded-lg">
                    {element.linkImagName === null ? (
                      <div></div>
                    ) : (
                      <img
                        onContextMenu={(event) => event.preventDefault()}
                        onDragStart={(event) => event.preventDefault()}
                        src={`../../../public/linkImage/${element.linkImagName}`}
                        alt=""
                        className="border h-[inherit] object-cover rounded-lg max-h-full w-[inherit]"
                      />
                    )}
                  </div>
                  <div className=" grid content-center w-full space-y-2 text-center">
                    <h3 className="text-1xl font-semibold lg:text-2xl ml-[-40px]">
                      {element.linkName}
                    </h3>
                  </div>
                </div>
              </a>
            </div>
          );
        } else {
          console.log("null");
          return null;
        }
      })}
    </>
  );
}

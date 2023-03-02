import React, { useEffect, useState } from "react";
import axios from "axios";


export default function Links(props) {
  const [linksData, setLinks] = useState([]);
    const [userEmail, setuserEmail] = useState([]);


  useEffect(() => {
    setLinks(props.links);
    setuserEmail(props.email)
  });

  async function linkClicked(linkid) {
    const LinkId = linkid
    const linkClicked = await axios.post(
      `http://localhost:3001/api/linkClicked/${userEmail}/${LinkId}`
    );
}


  return (
    <>
      {linksData.map((element, c) =>
        element.visible === true ? (
          <div key={c}>
            <a
              href={element.linkUrl}
              target="_blank"
              onClick={() => linkClicked(element._id)}
            >
              <div className="flex w-full card px-1.5 py-1.5 hover:shadow-indigo-500/40 lg:max-w-full rounded-md">
                <div className="border-1 h-14 w-16 rounded-lg">
                  {element.linkImagName === null ? (
                    <div></div>
                  ) : (
                    <img
                      src={`../../../public/linkImage/${element.linkImagName}`}
                      alt=""
                      className="border h-[inherit] object-cover rounded-lg max-h-full w-[inherit]	"
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
        ) : null
      )}
    </>
  );
}

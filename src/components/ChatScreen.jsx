import React, { useEffect, useState } from "react";

import { adminInfo } from "../Recoil";
import { useRecoilState } from "recoil";

import { withRouter } from "react-router";

import { Link, useHistory } from "react-router-dom";

function ChatScreen() {
  let history = useHistory();

  const [adminData, setadminData] = useRecoilState(adminInfo);

  const [Loaded, setLoaded] = useState(false);
console.log('adminData',adminData)
  useEffect(() => {
    if (adminData && window?.ocs) {
        console.log('adminData',window)
      setLoaded(true);

      // console.log(window.ocs)

      window.ocs.init({
        appid: "add06e35baef788640b0d11db972ccc1",

        appkey: "dbfb2a84740fde5dca037ffccaf7ca58",

        domain: "yahkiawakened.store",

        global: "1",

        id: adminData?._id,

        toid: "",

        colorScheme: "a6acad",

        onlyAudio: 0, // will be given if you need audio chat

        element: "#chat",

        disableActionButtons: 0
      });
    }
  }, [adminData?._id]);

  return (
    <>
      <section>
        <div className="container">
          <div style={{ marginTop: 150 }}>
            {/* {props?.match?.params?.id && ( */}

              <h5 className="fc-dgray" style={{ marginBottom: 30 }}>
            <a onClick={() => history.goBack()}>
                <i className="fas fa-chevron-left fc-dred" /> Inbox
            </a>
              </h5>

            {/* )} */}

            <div id="chat"></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ChatScreen;

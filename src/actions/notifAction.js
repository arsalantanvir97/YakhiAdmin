import { baseURL, imageURL } from "../utils/api";
import axios from "axios";
import {
  ADMIN_LOGIN_FAIL,
  NOTIFICATION_SUCCESS,
} from "../constants/adminConstants";

export const gettingallNotif = () => async (dispatch, getState) => {
  try {
    // dispatch({
    //   type: ADMIN_LOGIN_REQUEST,
    // })

    const {
      adminLogin: { adminInfo },
    } = getState();
    console.log("adminInfo.token", adminInfo.token);
    console.log("getallNotification");
    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const res = await axios.get(
      `${baseURL}/notification/adminnotification`,
      config
    );
    console.log("res", res);
    if (res?.status == 201) {
      dispatch({
        type: NOTIFICATION_SUCCESS,
        payload: res?.data?.getAllNotification,
      });
      localStorage.setItem(
        "notifdata",
        JSON.stringify(res?.data?.getAllNotification)
      );

      // localStorage.setItem("", JSON.stringify(res?.data));
    }
    // else if(res?.status==201){
    //   Toasty('error',`Invalid Email or Password`);
    //   dispatch({
    //     type: ADMIN_LOGIN_FAIL,
    //     payload:
    //     res?.data?.message
    //   })
    //   document.location.href = '/'

    // }
  } catch (error) {
    dispatch({
      type: ADMIN_LOGIN_FAIL,
      payload: error,
    });
  }
};
export const markReadAllNotif = () => async (dispatch, getState) => {
  try {
    // dispatch({
    //   type: ADMIN_LOGIN_REQUEST,
    // })

    const {
      adminLogin: { adminInfo },
    } = getState();
    console.log("adminInfo.token", adminInfo.token);
    console.log("getallNotification");
    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const res = await axios.get(
      `${baseURL}/notification/markallNotificationasRead`,config);
    console.log("res", res);
    if (res?.status == 200) {
      dispatch({
        type: NOTIFICATION_SUCCESS,
        payload: res?.data,
      });
      localStorage.setItem(
        "notifdata",
        JSON.stringify(res?.data)
      );
      }
    // }
    // else if(res?.status==201){
    //   Toasty('error',`Invalid Email or Password`);
    //   dispatch({
    //     type: ADMIN_LOGIN_FAIL,
    //     payload:
    //     res?.data?.message
    //   })
    //   document.location.href = '/'

    // }
  } catch (error) {
    dispatch({
      type: ADMIN_LOGIN_FAIL,
      payload: error,
    });
  }
};

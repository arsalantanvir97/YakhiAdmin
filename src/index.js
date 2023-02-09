import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';

import HttpsRedirect from 'react-https-redirect';
export const queryClient = new QueryClient({defaultOptions:{queries:{staleTime:1000*60*10}}});


ReactDOM.render(
    <HttpsRedirect>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true}/>

        <ToastContainer />
        <App />
      </QueryClientProvider>
    </RecoilRoot>
  </HttpsRedirect>
    ,
  document.getElementById("root")
);

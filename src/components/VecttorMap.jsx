import React,{useRef,useEffect} from 'react'
import { VectorMap } from "react-jvectormap";

const VecttorMap = () => {
 
  
    const map = useRef();

const onToolTipShow = (e, el, code) => {
  console.log('e, el, code',e, );

   let content =el.html()
    console.log('content',content);
   return el.html(content)
 }
    return (
        <VectorMap
        map={"us_aea"}
        backgroundColor="#FFFF"
        markerStyle={{
          initial: {
            fill: "#FFFF",
            stroke: "#383f47"
          }
        }}
        onRegionTipShow={onToolTipShow}
        series={{
          markers: [
            {
              attribute: "r",
              scale: [5, 20],
              values: [60, 6, 54],
              normalizeFunction: "polynomial"
            }
          ]
        }}
        regionStyle={{
          initial: {
            fill: "#C50028"
          },
          hover: {
            fill: "red"
          }
        }}
       
        ref={map}
        containerStyle={{
          width: "100%",
          height: "100%"
        }}
        containerClassName="map"
      />
    )
}

export default VecttorMap

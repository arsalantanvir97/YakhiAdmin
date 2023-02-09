import api, { baseURL } from "../../../utils/api";

export const getEvents = async( page,
    perPage,
    searchString,
    from,
    to,
    status,
    sort,) => {
    const {data}= await api({
       url: `${baseURL}/event/eventslogs`,
       method: "GET",
       params: {
        page,
        perPage,
        searchString,
        from,
        to,
        status,
        sort,
       },
     
     });
     return data?.event
 
   };
   export const createAEvent = (data) =>
    api({
        url: `${baseURL}/event/createevents`,
        method: "POST",
        data,
    });
    
    export const getEventDetails = (id) =>
    api({
        url: `${baseURL}/event/geteventsdetails/${id}`,
        method: "GET",
    });
    export const EditingEvent = (data) =>
    api({
      url: `${baseURL}/event/editevents`,
      method: "POST",
      data,
    });
import fetch from "./FetchInterceptor";

const httpService = {};

httpService.postData = function (data, URL) {
  return fetch({
    url: `${URL}`,
    method: "post",
    data,
  });
};
/**get Data in httpService Service */
httpService.getData = function (data, URL) {
  /**if some pagination or some url params */
  const queryParams = new URLSearchParams(data);
  // const url = queryParams.toString() ? `/${URL}?${queryParams.toString()}` : `/${URL}`;
  const url = data ? `/${URL}?${queryParams.toString()}` : `/${URL}`;
  return fetch({
    url: `${url}`,
    method: "get",
    data: data,
  });
};
httpService.putData = function (data, URL) {
  if (data && data.hasOwnProperty("id")) {
    return fetch({
      url: `${URL}/${data.id}`,
      method: "put",
      data,
    });
  } else if (data instanceof FormData && data.get("id")) {
    return fetch({
      url: `${URL}/${data.get("id")}`,
      method: "put",
      data,
    });
  }
};
httpService.getSingleData = function (id, URL) {
  return fetch({
    url: `${URL}/${id}`,
    method: "get",
  });
};
//
httpService.deleteData = function (id, URL) {
  return fetch({
    url: `${URL}/${id}`,
    method: "delete",
  });
};

export default httpService;

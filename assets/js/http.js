function httpRequest(method, url, data) {
  const request = new XMLHttpRequest();
  request.open(method, url);
  request.setRequestHeader("Accept", "application/json");
  const promise = new Promise((resolveFn, rejectFn) => {
    request.onreadystatechange = function () {
      if (request.readyState !== XMLHttpRequest.DONE) return;
      if (request.status === 200) {
        resolveFn(request.response, request.responseType);
      } else {
        rejectFn(request.status, request.response, request.responseType);
      }
    };
  });

  request.send(data);
  return promise;
}

function httpPost(url, data) {
  return httpRequest('POST', url, data);
}
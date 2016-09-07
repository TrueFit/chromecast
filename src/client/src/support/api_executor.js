// import
import Http from './http';

// export
export const GET = 'GET';
export const POST = 'POST';
export const PUT = 'PUT';
export const DELETE = 'DELETE';

// this is the thunk response
export const apiExecutor = (apiStruct) =>
  (dispatch) => {
    const http = new Http();
    let request = null;

    switch (apiStruct.verb) {
      case GET:
        request = http.get(apiStruct.url);
        break;

      case POST:
        request = http.post(apiStruct.url, apiStruct.data);
        break;

      case PUT:
        request = http.put(apiStruct.url, apiStruct.data);
        break;

      case DELETE:
        request = http.delete(apiStruct.url);
        break;

      default:
        throw new Error(`Verb: ${apiStruct.verb} not known`);
    }

    const action = (type, payload) => ({ type, payload });
    return request.then((response) => {
      const result = apiStruct.translateResponse ? apiStruct.translateResponse(response) : response;

      dispatch(action(apiStruct.successType, result));
      return result;
    }).catch((err) => {
      dispatch(action(apiStruct.failureType, err));

      throw err;
    });
  };

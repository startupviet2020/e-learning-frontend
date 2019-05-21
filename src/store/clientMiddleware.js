let activeReqCounter = 0;

export default ({ dispatch, getState }) => next => (action) => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }
  if (!action.promise) {
    return next(action);
  }

  const { promise, type, callback, ...rest } = action;
  const beginAction = type;
  const successAction = `${type}_SUCCESS`;
  const failureAction = `${type}_FAILURE`;

  next({ type: beginAction, ...rest });

  activeReqCounter += 1;

  next({ type: 'APP_LOADING', payload: true });

  let p = promise;
  if (typeof promise === 'function') {
    p = promise(dispatch, getState);
  }

  return p.then((result) => {
    activeReqCounter -= 1;
    if (activeReqCounter <= 0) {
      next({ type: 'APP_LOADING', payload: false });
      activeReqCounter = 0;
    }

    next({
      type: successAction,
      payload: result,
      options: rest.payload,
    });

    const response = { success: true, result };
    callback && callback(response, dispatch, getState);
    return response;
  }).catch((error) => {
    activeReqCounter -= 1;
    if (activeReqCounter <= 0) {
      next({ type: 'APP_LOADING', payload: false });
      activeReqCounter = 0;
    }

    next({
      type: failureAction,
      payload: error,
      options: rest.payload,
    });
    
    if (error.data && error.data.status === 403) {
      next({
        type: 'APP_MESSAGE',
        payload: {
          type: 'access_denied',
          content: ""
        },
      });
    } else {
      next({
        type: 'APP_MESSAGE',
        payload: {
          type: 'error',
          content: ""
        },
      });
    }

    const response = { success: false, error };
    callback && callback(response, dispatch, getState);
    return response;
  });
};

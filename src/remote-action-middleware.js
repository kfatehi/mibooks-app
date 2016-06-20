export default () => store => next => action => {
  console.log('middleware sees action', action);
  return action;
}

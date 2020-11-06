/* eslint-disable no-param-reassign, consistent-this, no-invalid-this, prefer-reflect */
const DEFAULT_DELAY = 200;

function getDelayedCallback(cb, delay) {
  if (typeof cb === "number") [cb, delay] = [delay, cb];

  delay = delay || DEFAULT_DELAY;

  if (typeof cb === "undefined")
    return callback => getDelayedCallback(callback, delay);

  if (typeof cb !== "function")
    throw new TypeError(`callback parameter must be a function, ${typeof cb} given`);

  let timeout = null;
  return function delayedCallback(...args) {
    const self = this;

    clearTimeout(timeout);
    timeout = setTimeout(() => cb.call(self, ...args), delay);
  };
}

module.exports = getDelayedCallback;

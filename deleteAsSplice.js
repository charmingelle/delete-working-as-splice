'use strict';

const isError = (array, index) => {
  return (
    array.hasOwnProperty(index) &&
    !Object.getOwnPropertyDescriptor(array, index).configurable
  );
};

const decorateArray = array => {
  if (!Array.isArray(array)) {
    throw new Error('The argument is not as array');
  }

  return new Proxy(array, {
    deleteProperty: (array, index) => {
      if (isError(array, index)) {
        throw new SyntaxError(
          'An own non-configurable property cannot be deleted'
        );
      }

      if (index >= 0 && index < array.length) {
        array.splice(index, 1);
      }

      return true;
    }
  });
};

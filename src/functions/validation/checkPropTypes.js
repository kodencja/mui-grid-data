
  export const returnErrorIfPropTypeInvalid = (props, propName) => {
    if(props.id){
      return new Error(
        `The type of ${propName} in data of ID no ${props.id}: ${props[propName]} is not a valid`
      );
    }
    return new Error(
        `The data named '${propName}': '${props[propName]}' is not of valid type`
      );
  }


  export const checkIfNullOrEmptyStrOrUndefined = (val) => {
    return val === null || val === '' || val === undefined;
  }


const checkIfPropEqualsType = (...args) => {

    if (args.length <= 2) {
      return typeof args[0] === args[1];
    }
    const param = args.shift();
    return args.some((type) => typeof param === type);
  };

  
export const checkPropType = (...params) => {
    const props = params.shift();
    const propName = params.shift();
    const args = [props[propName], ...params];

      return checkIfPropEqualsType(...args);
  };
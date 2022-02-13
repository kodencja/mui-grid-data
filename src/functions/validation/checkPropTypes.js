
  export const returnErrorIfPropTypeInvalid = (props, propName) => {
    return new Error(
        `The type of ${propName} in data of ID no ${props.id}: ${props[propName]} is not a valid`
      );
  }

  export const checkIfNullOrEmptyStrOrUndefined = (val) => {
    return val === null || val === '' || val === undefined;
  }

const checkIfPropEqualsType = (...args) => {
// console.log('checkIfPropEqualsType');
    // if(typeof args[0] === 'undefined'){
    //     console.log(args[0]);
    //     console.log(args[1]);
    //     console.log(typeof args[0] === args[1]);
    // }
    // console.log(args);
    if (args.length <= 2) {
      // console.log(typeof args[0] === args[1])
      return typeof args[0] === args[1];
    }
    // const param = args[0];
    const param = args.shift();
    // console.log(param);
    // console.log(args);
    // const types = args.shift();
    return args.some((type) => typeof param === type);
  };
  
  export const checkPropType = (...params) => {
    const props = params.shift();
    const propName = params.shift();
    const args = [props[propName], ...params];
    // console.log(props[propName]);
    // console.log(params);
    // if(props.id > 1570){
        // console.log(args);
        // console.log(args[0]);
        // console.log(args[1]);
        // console.log(typeof args[0] === args[1]);
        // console.log(checkIfPropEqualsType(...args));
        // console.log(checkIfPropEqualsType(args));       
      // }

      return checkIfPropEqualsType(...args);
      // if (!checkIfPropEqualsType(...args)) {
      //   return returnErrorIfPropTypeInvalid(props, propName);
      // }
  };
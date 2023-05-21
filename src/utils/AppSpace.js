/* -----IMPORTANT---- *
      IF 'space' PROP DOESN'T WORK IN 'native-base' COMPONENTS, 
      JUST USE THIS AS A WRAPPER !!!
      ALSO MAKE SURE IT HAS ATLEAST 2 OR MORE CHILDREN
   * ---------------- *
 */

import {Box} from 'native-base';
import React from 'react';

const AddSpace = ({children, space, rest}) => {
  return (
    <Box {...rest}>
      {children.map((item, index) => (
        <Box key={index} m={space ? space : 2}>
          {item}
        </Box>
      ))}
    </Box>
  );
};

export default AddSpace;

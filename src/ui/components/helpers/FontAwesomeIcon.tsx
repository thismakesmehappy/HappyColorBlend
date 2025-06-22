import React from 'react';
import { FontAwesomeIcon as OriginalFontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

// Initialize the library if it hasn't been done elsewhere
library.add(fab, far, fas);

// Create a wrapper component with the same props as the original
const FontAwesomeIcon: React.FC<FontAwesomeIconProps> = (props) => {
  return <OriginalFontAwesomeIcon {...props} />;
};

export default FontAwesomeIcon;
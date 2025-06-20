import React from 'react';
import { FontAwesomeIcon as OriginalFontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faCircleXmark,
  faCircleCheck,
  faPencil,
  faTrash,
  faCircleMinus,
  faCirclePlus,
  faMinus
} from '@fortawesome/free-solid-svg-icons';

// Only add the specific icons we actually use
library.add(
  faCircleXmark,
  faCircleCheck,
  faPencil,
  faTrash,
  faCircleMinus,
  faCirclePlus,
  faMinus
);

// Create a wrapper component with the same props as the original
const FontAwesomeIcon: React.FC<FontAwesomeIconProps> = (props) => {
  return <OriginalFontAwesomeIcon {...props} />;
};

export default FontAwesomeIcon;

import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

const TickIcon: React.FC<Props> = ({ width, height }) => {
  return (
    <SvgCss
      xml={`<svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.20711 5.79289C1.81658 5.40237 1.18342 5.40237 0.792893 5.79289C0.402369 6.18342 0.402369 6.81658 0.792893 7.20711L2.20711 5.79289ZM4 9L3.29289 9.70711C3.49309 9.90731 3.76877 10.0133 4.05152 9.99867C4.33427 9.98409 4.59758 9.85033 4.77611 9.63059L4 9ZM11.2761 1.63059C11.6244 1.20196 11.5592 0.572153 11.1306 0.223886C10.702 -0.124381 10.0722 -0.0592285 9.72389 0.369407L11.2761 1.63059ZM0.792893 7.20711L3.29289 9.70711L4.70711 8.29289L2.20711 5.79289L0.792893 7.20711ZM4.77611 9.63059L11.2761 1.63059L9.72389 0.369407L3.22389 8.36941L4.77611 9.63059Z" fill="white"/>
      </svg>
      `}
      width={width}
      height={height}
    />
  );
};

export { TickIcon };

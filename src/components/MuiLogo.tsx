import * as React from 'react';
import AspectRatio, { AspectRatioProps } from '@mui/joy/AspectRatio';
import SVGComponent from './SVGComponent';

export default function MuiLogo({ sx, ...props }: AspectRatioProps) {
  return (
    <AspectRatio
      ratio="1"
      variant="plain"
      {...props}
      sx={[
        {
          width: 36,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <div>
         <SVGComponent />
      </div>
    </AspectRatio>
  );
}
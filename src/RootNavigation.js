import * as React from 'react';

export const isReadyRef = React.createRef();

export const navigationRef = React.createRef();

export function navigate(name, params) {
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    console.log("Root navitation to: " + name);
    navigationRef.current?.navigate(name, params);
 
  } else {
    console.log("not ready for " + name);
  }
}
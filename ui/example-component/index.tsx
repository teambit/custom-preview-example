import React from 'react';
import spinner from './spinner.svg';

export function ExampleComponent() {
  return (
    <div>
      some component with images! <img src={spinner} alt="spinner" />
    </div>
  );
}

import { useState } from 'react';

// hook used to return the state when document.isReady === "complete"
// also used to hide the initial loader
export const useReadyState = () => {
  const [ready, setReady] = useState(false);

  document.onreadystatechange = function () {
    console.log(document.readyState);
    const loader = document.querySelector('#loader');
    const root = document.querySelector('#root');
    if (loader && document.readyState === 'complete') {
      setReady(true);
      loader.classList.add('hidden');
      if (root) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        root.style.opacity = '1';
      }
    }
  };

  return ready;
};

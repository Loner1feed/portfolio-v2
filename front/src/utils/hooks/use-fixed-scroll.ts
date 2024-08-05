export const useFixedScroll = (target = 'body') => {
  const targetBlock = document.querySelector(target);

  const fixScroll = () => {
    if (targetBlock) targetBlock.setAttribute('style', 'overflow: hidden;');
    else console.log('Can`t find the target to fix the scroll!!!');
  };

  const releaseScroll = () => {
    if (targetBlock) targetBlock.removeAttribute('style');
    else console.log('Can`t find the target to release the scroll!!!');
  };

  return { fixScroll, releaseScroll };
};

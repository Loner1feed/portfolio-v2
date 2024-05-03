export const createPortalWrapper = (wrapperId: string): HTMLElement => {
  const wrapperEl = document.createElement('div');
  wrapperEl.setAttribute('id', wrapperId);
  document.body.appendChild(wrapperEl);
  return wrapperEl;
};

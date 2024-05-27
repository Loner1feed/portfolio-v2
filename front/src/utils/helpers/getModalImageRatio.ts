export const getModalImageRatio = (
  // ref to the image container
  ref: HTMLDivElement,
  // ref to the actual image
  image: HTMLImageElement,
) => {
  const clientHeightRatio =
    Math.round((ref.clientHeight / ref.clientWidth) * 100) / 100;

  const imageHeightRatio =
    Math.round(((image.clientHeight + 10) / (image.clientWidth + 10)) * 100) /
    100;

  return { clientHeightRatio, imageHeightRatio };
};

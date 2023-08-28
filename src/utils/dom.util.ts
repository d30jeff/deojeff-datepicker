export const isElementVisible = (child: Element, parent: Element): boolean => {
  return (
    child.getBoundingClientRect().top >= parent.getBoundingClientRect().top &&
    child.getBoundingClientRect().bottom <= parent.getBoundingClientRect().bottom &&
    child.getBoundingClientRect().left >= parent.getBoundingClientRect().left &&
    child.getBoundingClientRect().right <= parent.getBoundingClientRect().right
  );
};

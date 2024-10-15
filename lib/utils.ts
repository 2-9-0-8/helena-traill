export const capitalise = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

export const isVisible = (el: HTMLElement) =>
  Boolean(el.offsetWidth || el.offsetHeight || el.getClientRects().length)

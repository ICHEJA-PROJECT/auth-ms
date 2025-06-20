export const base64ToBuffer = (base64: string): Buffer => {
  return Buffer.from(base64.replace(/^data:image\/png;base64,/, ''), 'base64');
};

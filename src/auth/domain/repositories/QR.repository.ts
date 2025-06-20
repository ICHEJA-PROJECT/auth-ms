export interface QRRepository {
  generateQR(text: string): Promise<string>;
  readQR(imageBuffer: Buffer): Promise<string>;
}

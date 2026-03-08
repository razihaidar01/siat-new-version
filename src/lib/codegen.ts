import JsBarcode from "jsbarcode";

export function generateBarcodeDataUrl(text: string): string {
  const canvas = document.createElement("canvas");
  JsBarcode(canvas, text, {
    format: "CODE128",
    width: 2,
    height: 80,
    displayValue: true,
    fontSize: 14,
    margin: 10,
  });
  return canvas.toDataURL("image/png");
}

export function getQRUrl(certNumber: string): string {
  const verifyUrl = `https://www.siat.in/verify?cert=${encodeURIComponent(certNumber)}`;
  return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(verifyUrl)}`;
}

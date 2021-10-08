export function downloadImage(
  src?: string,
  fileName: string = "image",
  type: "png" | "jpg" | "jpeg" = "png"
): void {
  if (!src) return;
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = src;
  img.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx?.drawImage(img, 0, 0);
    const a = document.createElement("a");
    a.download = `${fileName}.${type}`;
    a.href = canvas.toDataURL(`image/${type}`);
    a.click();
    a.remove();
    canvas.remove();
  };
}

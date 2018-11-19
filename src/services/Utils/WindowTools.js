export class WindowTools {
  static setBodyImage(image) {
    document.body.style.backgroundImage = image ? `url("${image}")` : null;
  }

  static invertBodyImage() {
    document.body.style.filter = 'grayscale(100%';
  }
}

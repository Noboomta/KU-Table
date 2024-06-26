export const createCaptureStyleTag = (document: Document) => {
  const style = document.createElement('style')

  style.innerHTML = 'img {display: inline-block !important;}'

  document.head.appendChild(style)
}

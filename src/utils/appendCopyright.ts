export default function appendCopyright(element: HTMLElement) {
  const spanElement = document.createElement('span')
  spanElement.innerText = 'created by'
  spanElement.className = 'mx-1 text-right block dark:text-white'
  const link = document.createElement('a')
  link.setAttribute('href', 'https://ku-table.vercel.app')
  link.innerText = 'https://ku-table.vercel.app'
  link.className = 'text-blue-600 underline pl-1'

  spanElement.appendChild(link)

  element.appendChild(spanElement)
}

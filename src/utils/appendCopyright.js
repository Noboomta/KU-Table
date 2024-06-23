export default function appendCopyright(cloneDocument) {
  const spanElement = document.createElement('span')
  spanElement.innerText = 'created by'
  spanElement.className = 'mx-1 text-right block dark:text-white'
  const link = document.createElement('a')
  link.setAttribute('href', 'https://ku-table.vercel.app')
  link.innerText = 'https://ku-table.vercel.app'
  link.className = 'text-blue-600 underline pl-2'

  spanElement.appendChild(link)

  cloneDocument.getElementById('print-content').appendChild(spanElement)
}

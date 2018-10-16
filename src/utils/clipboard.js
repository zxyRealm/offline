
import Clipboard from 'clipboard'
import {message} from './request'

function clipboardSuccess () {
  message('复制成功', 'success')
}

function clipboardError () {
  message('复制失败', 'error')
}

export default function handleClipboard (text, event) {
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  clipboard.on('success', () => {
    clipboardSuccess()
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError()
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.onClick(event)
}

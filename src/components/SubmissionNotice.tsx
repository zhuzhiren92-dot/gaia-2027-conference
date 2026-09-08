import { useEffect, useRef } from 'react'

export function SubmissionNotice({ message, onClose }: { message: string; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (message && !dialog.current?.open) dialog.current?.showModal()
    if (!message && dialog.current?.open) dialog.current?.close()
  }, [message])

  return (
    <dialog className="submission-notice" ref={dialog} onClose={onClose} aria-labelledby="submission-notice-heading" aria-describedby="submission-notice-message">
      <h2 id="submission-notice-heading">Submission update</h2>
      <p id="submission-notice-message" role="status">{message}</p>
      <form method="dialog">
        <button className="pill-action-link" type="submit"><strong>OK</strong></button>
      </form>
    </dialog>
  )
}

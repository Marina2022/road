// 'use client'
//
// export default function GlobalError({
//                                       error,
//                                     }: {
//   error: Error
// }) {
//   // Можно логировать ошибку для себя, но ничего не показывать
//   console.error(error)
//
//   return <div>hellop</div>
// }


'use client' // Error boundaries must be Client Components

export default function GlobalError({
                                      error,
                                      reset,
                                    }: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    // global-error must include html and body tags
    <html>
    <body>
    <h2>Something went wrong!</h2>
    <button onClick={() => reset()}>Try again</button>
    </body>
    </html>
  )
}
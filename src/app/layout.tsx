import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs">
      <body>
        <div id="__next">{children}</div>
      </body>
    </html>
  )
}
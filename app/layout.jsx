import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata = {
  title: 'FridgeXL',
  description: 'Your smart visual fridge',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: geist.style.fontFamily }}>
        {children}
      </body>
    </html>
  )
}
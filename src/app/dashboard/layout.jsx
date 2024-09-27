
import { Suspense } from 'react';
export default function Layout({ children }) {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
      <main>{children}</main>
      </Suspense>
      
    </>
  )
}
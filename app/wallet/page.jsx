'use client'

import Image from 'next/image'
import Link from 'next/link'
import WalletButton from '@/public/assets/wallet-button.png'
import { useState } from 'react'

const Wallet = () => {
  const [urlWallet, setUrlWallet] = useState("")

  const onSubmit = (e) => {
    e.preventDefault()
    const email = document.getElementById('email').value
    fetch(`/api/google_wallet`, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
      }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then((res) => {
        return res.text()
      })
      .then((res) => {
        const { url } = JSON.parse(res)
        setUrlWallet(url)
      })
  }
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form id="form" onSubmit={onSubmit} className='w-96'>
        <p>Enter your email address to generate a new pass:</p>
        <div className='w-full flex my-3 space-x-2'>
          <input required type="email" id="email" placeholder="Email" className='grow border border-black px-3 rounded-md' />
          <button type="submit" className='bg-black text-white rounded-md py-2 px-3'>Create Pass</button>
        </div>
        <Link href={urlWallet} className={`${!urlWallet ? "invisible" : ""} block w-56 h-56`}>
          <Image src={WalletButton} />
        </Link>
      </form>
    </div>
  )
}

export default Wallet

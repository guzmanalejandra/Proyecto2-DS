

import Image from 'next/image'
import Scene from './Components/Scene'
import DropzoneComponent from './Components/DropzoneComponent'
export default function Home() {



  return (
    <main className="flex min-h-screen flex-row items-center justify-between p-24">
      {/* background scene */}
      <div className="absolute inset-0 -z-10 opacity-50 ">
        <Scene />
      </div>
      
      {/* title */}
      <div className="flex flex-col w-1/2 items-center justify-center">
        <h1 className="text-8xl font-bold colorText">HubMAP</h1>
        <p className="text-xl text-gray-200">
          <span className="font-black text-6xl text-white ">
          # Hacking the Human Vasculature
          </span>
        </p>
      </div>

      {/* Drag and drop */}
      <div className="flex flex-col w-1/2 items-center justify-center">
        <DropzoneComponent />
      </div>
    </main>
  )
}

"use client"

import { ArrowUp, ImagePlus, User } from 'lucide-react'
import React, { useState } from 'react'

function AiThumbnailGenerator() {
    const [userInput, setUserInput] = useState<string>()
    const [referenceImage, setReferenceImage] = useState<any>()
    const [faceImage, setFaceImage] = useState<any>()

  return (
    <div>
        <div className='px-10 md:px-20 lg:px-40'>
            <div className='flex flex-col items-center justify-center mt-20 gap-3'>
                <h2 className='font-bold text-3xl'>AI Thumbnail Generator</h2>
                <p className='text-gray-400 text-center'>Turn any video into a click magnet with our thumbnail Generator</p>
            </div>

            <div className='flex items-center gap-5 p-3 border rounded-xl mt-10 bg-secondary'>
                <textarea 
                className='w-full outline-0 bg-transparent' 
                placeholder='Enter Your Youtube Video Title or Description' 
                onChange={(event) => setUserInput(event.target.value)}/>
                <div className='p-3 bg-gradient-to-t from-red-500 to-orange-500 rounded-full'>
                    <ArrowUp />
                </div>
            </div>

            <div className='mt-3 flex gap-3'>
                <label htmlFor='referenceImageUpload' className='w-full'>
                    <div className='p-4 w-full border rounded-xl bg-secondary flex gap-2 
                    items-center justify-center hover:scale-105 transition-all cursor-pointer'>
                        <ImagePlus />
                        <h2>Reference Image</h2>
                    </div>
                </label>
                    <input type='file' id='referenceImageUpload' className='hidden' />
                    <label htmlFor='includeFace' className='w-full'>
                        <div className='p-4 w-full border rounded-xl bg-secondary flex gap-2 
                        items-center justify-center hover:scale-105 transition-all cursor-pointer'>
                            <User/>
                            <h2>Include Face</h2>
                        </div>
                    </label>
                    <input type='file' id='includeFace' className='hidden' />
            </div>

        </div>
      
    </div>
  )
}

export default AiThumbnailGenerator

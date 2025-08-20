"use client"

import axios from 'axios'
import { ArrowUp, ImagePlus, User, X } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

function AiThumbnailGenerator() {
    const [userInput, setUserInput] = useState<string>()
    const [referenceImage, setReferenceImage] = useState<any>()
    const [faceImage, setFaceImage] = useState<any>()
    const [referenceImagePreview, setReferenceImagePreview] = useState<string>()
    const [faceImagePreview, setFaceImagePreview] = useState<string>()

    const onHandleFileChange = (field:string, e:any) => {
        const selectedFile = e.target.files[0]

        if(field == 'referenceImage'){
            setReferenceImage(selectedFile)
            setReferenceImagePreview(URL.createObjectURL(selectedFile))
        }
        else{
            setFaceImage(selectedFile)
            setFaceImagePreview(URL.createObjectURL(selectedFile))
        }
    }

    const onSubmit = async() => {
        const formData = new FormData()
        userInput && formData.append('userInput' , userInput)
        referenceImage && formData.append('refImage' , referenceImage)
        faceImage && formData.append('faceImage' , faceImage)


        //POST API CALL
        const result = await axios.post('/api/generate-thumbnail', formData)

        console.log(result.data)
    }

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
                <div className='p-3 bg-gradient-to-t from-red-500 
                to-orange-500 rounded-full cursor-pointer' onClick={onSubmit}>
                    <ArrowUp />
                </div>
            </div>

            <div className='mt-3 flex gap-3'>
                <label htmlFor='referenceImageUpload' className='w-full'>
                    {!referenceImagePreview ? <div className='p-4 w-full border rounded-xl bg-secondary flex gap-2 
                    items-center justify-center hover:scale-105 transition-all cursor-pointer'>
                        <ImagePlus />
                        <h2>Reference Image</h2>
                    </div>
                    :
                    <div className='relative'>
                        <X className='absolute' onClick={() => setReferenceImagePreview(undefined)}/>
                        <Image src={referenceImagePreview} alt='Reference Image' width={100} height={100} 
                        className='w-[70px] h-[70px] object-cover rounded-sm' /> 
                    </div>
                    
                    }
                </label>
                    <input type='file' id='referenceImageUpload' className='hidden' 
                    onChange={(e) => onHandleFileChange('referenceImage', e )}/>
                    <label htmlFor='includeFace' className='w-full'>
                        {!faceImagePreview ? <div className='p-4 w-full border rounded-xl bg-secondary flex gap-2 
                        items-center justify-center hover:scale-105 transition-all cursor-pointer'>
                            <User/>
                            <h2>Include Face</h2>
                        </div> 
                        :
                        <div className='relative'>
                            <X className='absolute' onClick={() => setFaceImagePreview(undefined)}/>
                            <Image src={faceImagePreview} alt='Face Image' width={100} height={100}
                            className='w-[70px] h-[70px] object-cover rounded-sm' />
                        </div>
                        
                        }
                    </label>
                    <input type='file' id='includeFace' className='hidden' 
                    onChange={(e) => onHandleFileChange('faceImage', e )}/>
            </div>

        </div>
      
    </div>
  )
}

export default AiThumbnailGenerator

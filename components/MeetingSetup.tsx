'use client';

import { DeviceSettings, VideoPreview, useCall } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const MeetingSetup = ({ setIsSetupComplete }: { setIsSetupComplete: (val: boolean) => void }) => {
  const [isMicCamToggleOn, setIsMicCamToggleOn] = useState(false);
  const router = useRouter();

  const call = useCall();

  if (!call) {
    throw new Error('must be used within StreamCall component');
  }

  useEffect(() => {
    if (isMicCamToggleOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggleOn, call?.camera, call?.microphone]);
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>
      <h1 className='text-2xl font-bold'>Setup</h1>
      <VideoPreview />
      <div className='flex items-center justify-center gap-2 font-medium'>
        <label className='flex items-center justify-center gap-2 font-medium'>
          <input 
            type="checkbox"
            checked={isMicCamToggleOn}
            onChange={(e) => setIsMicCamToggleOn(e.target.checked)}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <Button className='rounded-md bg-green-500 px-4 py-2.5' onClick={() => {
        call.join();

        setIsSetupComplete(true);
      }}>
        Join meeting
      </Button>
      <Button className='rounded-md bg-red-500 px-4 py-2.5' onClick={() => router.back()}>
        Back
      </Button>
    </div>
  )
}

export default MeetingSetup
import React from 'react'

const ProfileBanner = () => {
  return (
    <div className='w-full h-[180px] relative bg-gradient-to-r from-[#ED75A7] via-[#43517A] to-[#3194BB]'>
        <div className='absolute profile-logo bottom-[-40px] bg-white overflow-hidden left-[50px] border-8 border-white  w-[130px] h-[130px] rounded-full'></div>
    </div>
  )
}

export default ProfileBanner
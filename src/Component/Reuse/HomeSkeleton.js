import React from 'react'
import Skeleton, { SkeletonTheme }  from 'react-loading-skeleton'

const HomeSkeleton = () => {
    return (
        <div key={0} style={{ width: '50vw' }}>
            <Skeleton />
        </div>
      )
}

export default HomeSkeleton

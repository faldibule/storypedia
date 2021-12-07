import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const Welcome = () => {
    return (
        <div>
            <p>Halaman Welcome </p>
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
                <p>
                    <Skeleton count={3} />
                </p>
            </SkeletonTheme>
        </div>
    )
}

export default Welcome

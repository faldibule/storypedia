import React from 'react'
import ContentLoader from 'react-content-loader'

const Welcome = () => {
    return (
        <div>
            <p>Halaman Welcome </p>
            <ContentLoader 
                speed={2}
                width={400}
                height={160}
                viewBox="0 0 400 160"
                backgroundColor="#adb5bd"
                foregroundColor="#ced4da"
            >
                <rect x="48" y="8" rx="3" ry="3" width="88" height="6" /> 
                <rect x="48" y="26" rx="3" ry="3" width="52" height="6" /> 
                <circle cx="20" cy="20" r="20" />
            </ContentLoader>
        </div>
    )
}

export default Welcome

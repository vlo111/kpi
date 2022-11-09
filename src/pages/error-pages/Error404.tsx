import React from 'react'

const PageNotFound: React.FC = () => {
  return (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', paddingTop: '18vh'
        }}>
            <h2 style={{ fontSize: '150px' }}>404</h2>
            <h3>Oops, nothing here...</h3>
            <p>Please Check the URL</p>
            <p>Otherwise, <a href="/">Click here</a> to redirect to homepage.</p>
        </div>

  )
}

export default PageNotFound

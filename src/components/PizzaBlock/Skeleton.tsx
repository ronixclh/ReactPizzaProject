import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton: React.FC = (props: any) => (
  <ContentLoader
    speed={2}
    className="pizza-block"
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="136" cy="117" r="115" />
    <rect x="0" y="247" rx="10" ry="10" width="280" height="24" />
    <rect x="0" y="289" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="405" rx="10" ry="10" width="95" height="30" />
    <rect x="130" y="390" rx="25" ry="25" width="152" height="45" />
  </ContentLoader>
)

export default Skeleton

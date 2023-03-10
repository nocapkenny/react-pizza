import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={500}
        viewBox="0 0 280 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <circle cx="134" cy="136" r="125" />
        <rect x="0" y="280" rx="10" ry="10" width="272" height="24" />
        <rect x="0" y="331" rx="10" ry="10" width="280" height="88" />
        <rect x="0" y="432" rx="10" ry="10" width="95" height="30" />
        <rect x="123" y="433" rx="25" ry="25" width="152" height="45" />
    </ContentLoader>
)

export default Skeleton
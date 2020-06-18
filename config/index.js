
export const productURI = () => {
    if(process.server === false){  // 客户端, 解决 Server error ，www.xiangruiping.cn 或 xiangruiping.cn 2个域名访问问题
        return window.location.host
    }else {
        return 'https://www.xiangruiping.cn'
    }
    
}
export const devURI = 'http://localhost:4000'

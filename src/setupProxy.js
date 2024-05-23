const { createProxyMiddleware } = require("http-proxy-middleware")
const { HOST } = require("../Apis")

module.exports = app => {
    app.use(
        createProxyMiddleware('/categories/',{
            target: HOST,
            changeOrigin: true,
        }),       
    )
    

    app.use(
        createProxyMiddleware('/o/token/',{
            target: HOST,
            changeOrigin: true,
        }),       
    )

    app.use(
        createProxyMiddleware('/user/current/',{
            target: HOST,
            changeOrigin: true,
        }),       
    )
}
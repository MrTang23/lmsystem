export default {
    //设置为私有命名空间
    namespaced: true,
    state: {
        theme: [//为了不写死所以用数组
            {
                name: "蓝色",
                value: '#101f30'
            },
            {
                name: "灰色",
                value: '#2b333e'
            },
            {
                name: "红色",
                value: '#7c1823'
            },
            {
                name: "黑色",
                value: '#000000'
            },
            {
                name: "绿色",
                value: '#15231b'
            }
        ]
    }
}
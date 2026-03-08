// 全局App对象（对应小程序的App()）
const App = {
    // 全局数据（对应小程序的globalData）
    globalData: {
        userInfo: null,
        logs: []
    },

    // 初始化（对应小程序的onLaunch）
    init() {
        // 1. 读取本地存储的日志
        const logs = localStorage.getItem('logs')
            ? JSON.parse(localStorage.getItem('logs'))
            : [];
        // 新增当前时间戳到日志头部
        logs.unshift(Date.now());
        // 存回本地存储
        localStorage.setItem('logs', JSON.stringify(logs));
        // 更新全局数据
        this.globalData.logs = logs;

        console.log('App初始化完成，日志数量：', logs.length);
    },

    // 模拟登录（对应小程序的wx.login）
    login() {
        return new Promise((resolve) => {
            // 网页版无微信登录，模拟「获取用户信息」逻辑
            const mockUserInfo = {
                nickName: 'Knowpals用户' + Math.floor(Math.random() * 1000),
                avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
                openId: 'web_' + Date.now() // 模拟openId
            };
            // 存储用户信息到全局和本地
            this.globalData.userInfo = mockUserInfo;
            localStorage.setItem('userInfo', JSON.stringify(mockUserInfo));

            console.log('登录成功，用户信息：', mockUserInfo);
            resolve(mockUserInfo);
        });
    },

    // 退出登录
    logout() {
        this.globalData.userInfo = null;
        localStorage.removeItem('userInfo');
        console.log('退出登录成功');
    },

    // 获取全局数据
    getGlobalData(key) {
        if (key) {
            return this.globalData[key];
        }
        return this.globalData;
    },

    // 设置全局数据
    setGlobalData(key, value) {
        this.globalData[key] = value;
    }
};

// 页面加载时执行初始化（对应小程序onLaunch）
App.init();
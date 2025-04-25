/**
 * 另一个落地页主题
 */
const CONFIG = {
    PROXIO_WELCOME_COVER_ENABLE: true, //是否显示页面进入的欢迎文字
    PROXIO_WELCOME_TEXT: '成长有迹可循\n爱意无限延伸', 

    // 英雄区块导航
    PROXIO_HERO_ENABLE: true, // 开启英雄区
    PROXIO_HERO_TITLE_1: '成长，始于细微。', // 英雄区文字
    PROXIO_HERO_TITLE_2: '童年没有标点，只有逗号，逗号，和未完待续的诣宝。', // 英雄区文字
    // 英雄区两个按钮，如果TEXT留空则隐藏按钮
    PROXIO_HERO_BUTTON_1_TEXT: '进入私密专区', // 英雄区按钮
    PROXIO_HERO_BUTTON_1_URL:
        'https://mvwebfs.kugou.com/202504242228/cfc225fc895427b11ef85c42d42cf7c0/v2/b0e151c356174bdd7c21155b4769bc18/G099/M08/1C/19/A4cBAFjnOQyAf1KOBZRArKAG1sQ795.mp4', // rick
    PROXIO_HERO_BUTTON_2_TEXT: '与诣宝一起玩游戏', // 英雄区按钮
    PROXIO_HERO_BUTTON_2_URL: 'https://ys-api.mihoyo.com/event/download_porter/link/ys_cn/official/pc_default', // 英雄区按钮
    PROXIO_HERO_BUTTON_2_ICON: '/images/starter/github.svg', // 英雄区按钮2的图标，不需要则留空

    // 英雄区配图，如需隐藏，改为空值即可 ''
    PROXIO_HERO_BANNER_IMAGE: '', // hero区背景，默认是获取Notion背景，如需另外配置图片可以填写在这里
    PROXIO_HERO_BANNER_IFRAME_URL: '', // hero背景区内嵌背景网页 ，可以配置一个网页地址，例如动画网页https://my.spline.design/untitled-b0c6e886227646c34afc82cdc6de4ca2/


    // 文章区块
    PROXIO_BLOG_ENABLE: true, // 首页博文区块开关
    PROXIO_BLOG_TITLE: '记录',
    PROXIO_BLOG_COUNT: 4, // 首页博文区块展示前4篇文章
    PROXIO_BLOG_TEXT_1: '诣宝最新动态',

    // 区块默认内容显示文章的summary文本，但也支持用自定义图片或logo德国替换掉占位显示内容
    PROXIO_BLOG_PLACEHOLDER_IMG_URL_1: '', // 填写要替换成的图片，支持图床或直接上传到项目中，示例  /images/feature-1.webp
    PROXIO_BLOG_PLACEHOLDER_IMG_URL_2: '',
    PROXIO_BLOG_PLACEHOLDER_IMG_URL_3: '',
    PROXIO_BLOG_PLACEHOLDER_IMG_URL_4: '',


    PROXIO_ANNOUNCEMENT_ENABLE: true, //公告文字区块

    // 特性区块
    PROXIO_FEATURE_ENABLE: true, // 特性区块开关
    PROXIO_FEATURE_TITLE: '为什么选择诣宝',
    PROXIO_FEATURE_TEXT_1: '像树苗拥抱阳光，我们收藏诣宝的每一次伸展。',
    PROXIO_FEATURE_TEXT_2:
        '记录点滴成长，珍藏每一份美好',

    // 特性1
    PROXIO_FEATURE_1_ICON_CLASS: 'fa-solid fa-stopwatch', // fas图标
    PROXIO_FEATURE_1_ICON_IMG_URL: '', // 图片图标选填，默认是fas图标，如果需要图片图标可以填写图片地址，示例/avatar.png
    PROXIO_FEATURE_1_TITLE_1: '全天候在线，成长不掉线',
    PROXIO_FEATURE_1_TEXT_1: '从清晨到深夜，都有诣宝的每一声笑与每一次闹！',

    PROXIO_FEATURE_2_ICON_CLASS: 'fa-solid fa-comments',
    PROXIO_FEATURE_2_ICON_IMG_URL: '', 
    PROXIO_FEATURE_2_TITLE_1: '群聊人气王，圈粉无死角',
    PROXIO_FEATURE_2_TEXT_1: '萌诣魅力值拉满，群友集体变‘妈粉/爸粉’！',

    PROXIO_FEATURE_3_ICON_CLASS: 'fa-solid fa-search',
    PROXIO_FEATURE_2_ICON_IMG_URL: '',
    PROXIO_FEATURE_3_TITLE_1: '发癫式营业，能量永不断',
    PROXIO_FEATURE_3_TEXT_1: '表情包轰炸+深夜小作文，群聊冷场终结者！',

    PROXIO_FEATURE_BUTTON_TEXT: '了解更多', // 按钮文字
    PROXIO_FEATURE_BUTTON_URL: 'https://mvwebfs.tx.kugou.com/202504242230/658142cc8a796adae05aacb1ce392229/v2/f00858ff8061e523f883f4b71732f95d/G131/M01/1F/0F/ww0DAFretiSAKZ2jB_fgWyX-aNU408.mp4', // 阳光彩虹小白马

    // 首页生涯区块
    PROXIO_CAREER_ENABLE: true, // 区块开关
    PROXIO_CAREER_TITLE: '生涯',
    PROXIO_CAREER_TEXT:
        '诣宝的每一步，都是未来的光',

    // 生涯内容卡牌 ，title是标题 ，bio是备注，text是详情
    PROXIO_CAREERS: [
        { title: '纯真时期', bio: '2013-2024', text: '曾是群聊团宠，用“奥特曼卡片外交”称霸小区，把暑假作业藏冰箱谎称“知识需要冷藏保鲜”，因坚信自己是哈利波特中国分校落榜生而绝食三天。群友至今仍在用他的童年语音包（“姐姐你好像会发光的粽子哦”）当起床闹铃。' },
        { title: '叛逆时期', bio: '2024-2025', text: '染过七天掉色的荧光紫刘海，在班群发《论食堂鸡腿缩水与资本剥削的关联性》被校长约谈，深夜转发伤痛文学配文“宇宙是块过期蛋糕，而我是上面的霉”。群友为挽救其社交生命值，众筹编写《高中生社会入门手册》，却被他改成《如何科学地让全世界觉得你死了但没完全死》。' },
        { title: '入定时期', bio: '2025-Now', text: '突然从“45度仰卧起坐”进化为“恒温37度正常生物”，发明“男同学的大腿比女同学更软”理论，在月考作文写《论早自习与蒙德骑士练习的相似性》获零分并登上校园暗网热搜。面对群友咆哮“天天谈恋爱怎么办”，淡定回应：“我给烤冷面摊王叔当互联网军师，三年内上市，饿不死。”群友锐评：“他活成了我老板买不起的样子。”' }
    ],

    // 首页用户测评区块
    PROXIO_TESTIMONIALS_ENABLE: true, // 测评区块开关
    PROXIO_TESTIMONIALS_TITLE: '网友反馈',
    PROXIO_TESTIMONIALS_TEXT_1: '群友们怎么说',
    PROXIO_TESTIMONIALS_TEXT_2:
        '数百位群友共同见证诣宝的成长瞬间！从「24小时发癫」的暖心陪伴，到「轰炸式南梁营业」的欢乐名场面，大家通过每日打卡、表情包互动和深夜畅聊，在欢笑中记录了无数成长里程碑——',

    // 用户测评处的跳转按钮
    PROXIO_TESTIMONIALS_BUTTON_URL: 'https://wapyyk.39.net/hospitals/nanxingbing/c_p1/', // 男科
    PROXIO_TESTIMONIALS_BUTTON_TEXT: '联系我',

    // 这里不支持CONFIG和环境变量，需要一一修改此处代码。
    PROXIO_TESTIMONIALS_ITEMS: [
        {
            PROXIO_TESTIMONIALS_ITEM_TEXT:
                '太厉害了，诣宝当小机长飞过大海的时候心率能到一百八！ ',
            PROXIO_TESTIMONIALS_ITEM_AVATAR:
                '/Account cancelled.jpg',
            PROXIO_TESTIMONIALS_ITEM_NICKNAME: '账号已注销',
            PROXIO_TESTIMONIALS_ITEM_DESCRIPTION: '一群群友',
            PROXIO_TESTIMONIALS_ITEM_URL: 'https://health.baidu.com/m/detail/ar_546639625444983042'
        },
        {
            PROXIO_TESTIMONIALS_ITEM_TEXT:
                '诣宝经常抱他裸着的哥们',
            PROXIO_TESTIMONIALS_ITEM_AVATAR:
                '/public/images/gunfu.jpg',
            PROXIO_TESTIMONIALS_ITEM_NICKNAME: '棍父',
            PROXIO_TESTIMONIALS_ITEM_DESCRIPTION: '东京不知名高中生',
            PROXIO_TESTIMONIALS_ITEM_URL: 'https://zh.moegirl.org.cn/%E7%94%B7%E5%AD%90%E9%AB%98%E4%B8%AD%E7%94%9F%E7%9A%84%E6%97%A5%E5%B8%B8'
        },
        {
            PROXIO_TESTIMONIALS_ITEM_TEXT:
                '诣宝不是宝贝，是真沙贝',
            PROXIO_TESTIMONIALS_ITEM_AVATAR:
                '/public/images/litaton.jpg',
            PROXIO_TESTIMONIALS_ITEM_NICKNAME: '丽塔欧恩 蛋赞先生',
            PROXIO_TESTIMONIALS_ITEM_DESCRIPTION: '超比养老院门口坐着的百岁大爷',
            PROXIO_TESTIMONIALS_ITEM_URL: 'https://i0.hdslb.com/bfs/archive/d6cf835c590379db77703b13831f9fe9279879fc.jpg'
        },
        {
            PROXIO_TESTIMONIALS_ITEM_TEXT:
                '他（诣宝）真像个小美女，就是不喜欢刮毛',
            PROXIO_TESTIMONIALS_ITEM_AVATAR:
                '/public/images/hognxia.jpg',
            PROXIO_TESTIMONIALS_ITEM_NICKNAME: 'ICE',
            PROXIO_TESTIMONIALS_ITEM_DESCRIPTION: '下北泽starry吧台の乐队皇帝',
            PROXIO_TESTIMONIALS_ITEM_URL: 'https://www.bilibili.com/bangumi/play/ss43164'
        },
        {
            PROXIO_TESTIMONIALS_ITEM_TEXT:
                '诣宝他本质是低电的、悲观的、成为自己的英雄。',
            PROXIO_TESTIMONIALS_ITEM_AVATAR:
                '/public/images/wuya.jpg',
            PROXIO_TESTIMONIALS_ITEM_NICKNAME: '群乌鸦-星袅',
            PROXIO_TESTIMONIALS_ITEM_DESCRIPTION: '世外神人，答辩大师，在大雷界中享有很高的声望。',
            PROXIO_TESTIMONIALS_ITEM_URL: 'https://pic.kts.g.mi.com/3dee90f169b3b6de2c855eddd0ea48805170131967573719558.jpg'
        },
        {
            PROXIO_TESTIMONIALS_ITEM_TEXT: '用好久了，太感谢了',
            PROXIO_TESTIMONIALS_ITEM_AVATAR:
                '/Account cancelled.jpg',
            PROXIO_TESTIMONIALS_ITEM_NICKNAME: '不愿透露姓名的群友',
            PROXIO_TESTIMONIALS_ITEM_DESCRIPTION: '隐私设置，暂不展示',
            PROXIO_TESTIMONIALS_ITEM_URL: 'https://www.baidu.com/'
        }
    ],

    //   FAQ 常见问题模块
    PROXIO_FAQ_ENABLE: true, // 常见问题模块开关
    PROXIO_FAQ_TITLE: '常见问题解答',
    PROXIO_FAQ_TEXT_1: '有任何问题吗？请看这里',
    PROXIO_FAQ_TEXT_2: '我们收集了常见的群友疑问',
    PROXIO_FAQS: [
        { q: '诣宝几岁了？', a: '诣宝已经3岁零209个月啦，神不知鬼不觉，嗖~！诣宝又升级啦！' },
        { q: '如何参与记录诣宝的成长？', a: '只需三步，即刻化身“云家长”！1.加入Q群围观每日蹲宝直播 \n2.用截图/记录接龙“投喂”诣宝的成长素材,\n3.参与投票决定下周主题（比如“诣宝的迷惑发言大赏”）\n“你的每条弹幕，都是他的成长弹幕！”' },
        { q: '诣宝的日记更新频率有多高？', a: '不定时更新记录，但是从现在开始每一天都会有全新的记录与爱同在！' },
        { q: '素材都是真实的？怀疑有剧本！', a: '本栏目主打一个“人类幼崽不受控”！\n1.证据链：随机抽取群友当“监工”，直击诣宝哭闹现场；2.\n翻车实录：主页专门开设「翻车区」（例：精心策划的大雷被诣宝当成雷坑）\n3.科学认证：特邀幼教专家大冰老师锐评“诣宝迷惑行为”\n“如果这是演的，建议直接保送奥斯卡幼崽组！”' },
    ],

    // 关于作者区块
    PROXIO_ABOUT_ENABLE: true, // 关于作者区块区块开关
    PROXIO_ABOUT_TITLE: '关于诣宝',
    PROXIO_ABOUT_TEXT_1: '一个让你爱上成长的活力伙伴',
    PROXIO_ABOUT_TEXT_2:
        '他是群里最受欢迎的“云养崽崽”——诣宝用奶声奶气的语音轰炸、歪歪马马扭扭的游戏录像，和突然蹦出的“人类幼崽迷惑发言”，承包了群友每日的快乐源泉。从第一次摇摇晃晃学会放下，到偷偷把糖果藏在喇叭里，他的成长日记没有滤镜，只有最鲜活的生命力。“看他长大，像养了个电子哈基米，但比猫更费力！”（@每天马枪の群主 含泪认证）',
    PROXIO_ABOUT_PHOTO_URL: '/avatar.png',
    PROXIO_ABOUT_KEY_1: '成长上限',
    PROXIO_ABOUT_VAL_1: '未知',
    PROXIO_ABOUT_KEY_2: '服务过的哥哥姐姐',
    PROXIO_ABOUT_VAL_2: '1000+',
    PROXIO_ABOUT_KEY_3: '做题总数',
    PROXIO_ABOUT_VAL_3: '5000+',
    PROXIO_ABOUT_KEY_4: '累积学习时长（小时）',
    PROXIO_ABOUT_VAL_4: '10000+',

    PROXIO_ABOUT_BUTTON_URL: 'https://baike.baidu.com/item/%E5%94%90%E7%BA%B3%E5%BE%B7%C2%B7%E7%89%B9%E6%9C%97%E6%99%AE/9916449',
    PROXIO_ABOUT_BUTTON_TEXT: '关于我',

    // 横向滚动文字
    PROXIO_BRANDS_ENABLE: true, // 滚动文字
    PROXIO_BRANDS: [
        'Web Design',
        'Logo Design',
        'Mobile App Design',
        'Product Design'
    ],

    PROXIO_FOOTER_SLOGAN: '陪诣宝长大，让时光有温度。',

    // 页脚三列菜单组
    // 页脚菜单
    PROXIO_FOOTER_LINKS: [
        {
            name: '友情链接',
            menus: [
                {
                    title: 'ZCHBImpulseX',
                    href: 'https://space.bilibili.com/123704388'
                },
                {
                    title: '奶龙',
                    href: 'https://www.bilibili.com/bangumi/play/ss40551'
                }
            ]
        },
        {
            name: '开发者',
            menus: [
                { title: 'Github', href: 'https://github.com' },
                {
                    title: '开发帮助',
                    href: 'https://baijiahao.baidu.com/s?id=1812029965541106189'
                },
                {
                    title: '功能反馈',
                    href: 'https://tieba.baidu.com/f?kw=%E5%9C%A3%E6%9D%AF%E6%88%98%E4%BA%89&ie=utf-8'
                },
                {
                    title: '技术讨论',
                    href: 'https://tieba.baidu.com/f?kw=apex'
                },
                {
                    title: '关于作者',
                    href: 'https://baike.baidu.com/item/%E7%9A%AE%E7%89%B9%C2%B7%E6%A0%BC%E9%87%8C%E8%8A%AC/64564737'
                }
            ]
        }],

    PROXIO_FOOTER_BLOG_LATEST_TITLE: '最新文章',

    PROXIO_FOOTER_PRIVACY_POLICY_TEXT: '隐私政策',
    PROXIO_FOOTER_PRIVACY_POLICY_URL: '/privacy-policy',

    PROXIO_FOOTER_PRIVACY_LEGAL_NOTICE_TEXT: '法律声明',
    PROXIO_FOOTER_PRIVACY_LEGAL_NOTICE_URL: '/legacy-notice',

    PROXIO_FOOTER_PRIVACY_TERMS_OF_SERVICE_TEXT: '服务协议',
    PROXIO_FOOTER_PRIVACY_TERMS_OF_SERVICE_URL: '/terms-of-use',

    // 404页面的提示语
    PROXIO_404_TITLE: '我们似乎找不到您要找的页面。',
    PROXIO_404_TEXT: '抱歉！您要查找的页面不存在。可能已经移动或删除。',
    PROXIO_404_BACK: '回到主页',

    // 页面底部的行动呼吁模块
    PROXIO_CTA_ENABLE: true,
    PROXIO_CTA_TITLE: '与诣宝建立联系',
    PROXIO_CTA_TITLE_2: '让我们离诣宝更进一步',
    PROXIO_CTA_DESCRIPTION:
        '我们提供了详细的记录，帮助你即刻闯入诣宝生活',
    PROXIO_CTA_BUTTON: true, // 是否显示按钮
    PROXIO_CTA_BUTTON_URL:
        'https://wapyyk.39.net/hospitals/nanxingbing/c_p1/',
    PROXIO_CTA_BUTTON_TEXT: '联系我',

    PROXIO_POST_REDIRECT_ENABLE: true, // 默認開啟重定向
    PROXIO_POST_REDIRECT_URL: 'https://wapyyk.39.net/hospitals/nanxingbing/c_p1/', // 重定向域名
    PROXIO_NEWSLETTER: process.env.NEXT_PUBLIC_THEME_PROXIO_NEWSLETTER || false // 是否开启邮件订阅 请先配置mailchimp功能 https://docs.tangly1024.com/article/notion-next-mailchimp
}
export default CONFIG

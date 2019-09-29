
var everyDay = new Vue({
    el: '#every_day',
    data: {
        content: 'abcdefghijklmnopqrstuvwxyz'
    },
    computed: {
        getContent: function () {
            return this.content;
        }
    },
    created: function () {
        axios({
            method: "get",
            url: "/queryEveryDay"
        }).then(function (resp) {
            everyDay.content = resp.data.data[0].content;
        }).catch(function (resp) {
            console.log("请求失败");
        });
    }
});

var articleList = new Vue({
    el: '#article_list',
    data: {
        page:0,
        pageSize:3,
        articleList: [
            {
                title: '乱码表，看懂常见编码乱码',
                content: '乱码，是最常遇到的问题，这个表貌似可以轻松的通过“乱码”的样子明白乱码原因。好吧，我承认这是又水了一篇。。。。',
                date: '2019-8-10',
                views: '996',
                tags: 'test1 test2',
                id: '1',
                link: ''
            },

        ]
    },
    computed:{
        getPage:function() {
            return function (page,pageSize) {
                axios({
                    method:'get',
                    url:'/queryBolgByPage?page=' + (page + 1) + '&pageSize=' + pageSize
                }).then(function (resp) {
                    var result = resp.data.data;
                    var list = [];
                    for (var i = 0; i < result.length; i++) {
                        var temp = {};
                        temp.title = result[i].title;
                        temp.content = result[i].content;
                        temp.date = result[i].ctime;
                        temp.views = result[i].views;
                        temp.tags = result[i].tags;
                        temp.id = result[i].id;
                        temp.link = '' + result[i].id;
                        list.push(temp);
                    }
                    articleList.articleList = list;
                }).catch(function (resp) {
                    console.log('请求出错');
                })
            }
        }
    },
    created: function () {
        this.getPage(this.page,this.pageSize)
    }
});
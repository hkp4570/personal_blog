
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
        page:1,
        pageSize:5,
        count:100,
        pageNumList:[],
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
        jumpTo:function(){
          return function (page) {
              this.getPage(page,this.pageSize);
          }
        },
        getPage:function() {
            return function (page,pageSize) {
                var searcheUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
                var tag = "";
                for (var i = 0 ; i < searcheUrlParams.length ; i ++) {
                    if (searcheUrlParams[i].split("=")[0] == "tag") {
                        try {
                            tag = searcheUrlParams[i].split("=")[1];
                        }catch (e) {
                            console.log(e);
                        }
                    }
                }
                if(tag == ''){
                    axios({
                        method:'get',
                        url:'/queryBolgByPage?page=' + (page - 1) + '&pageSize=' + pageSize
                    }).then(function (resp) {
                        var result = resp.data.data;
                        var list = [];
                        for (var i = 0; i < result.length; i++) {
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = new Date(result[i].ctime * 1000).toLocaleDateString().replace(/\//g,'-');
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = '/blog_detail.html?bid=' + result[i].id;
                            list.push(temp);
                        }
                        articleList.articleList = list;
                        articleList.page = page;
                    }).catch(function (resp) {
                        console.log('请求出错');
                    });
                    axios({
                        method:'get',
                        url:'/queryBlogCount'
                    }).then(function (resp) {
                        articleList.count = resp.data.data[0].count;
                        articleList.generatePageTool;
                    });
                }else{
                    axios({
                        method: "get",
                        url: "/queryByTag?page=" + (page - 1) + "&pageSize=" + pageSize + "&tag=" + tag
                    }).then(function(resp) {
                        var result = resp.data.data;
                        var list = [];
                        for (var i = 0 ; i < result.length ; i ++) {
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = result[i].ctime;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = "/blog_detail.html?bid=" + result[i].id;
                            list.push(temp);
                        }
                        articleList.articleList = list;
                        articleList.page = page;
                    }).catch(function (resp) {
                        console.log("请求错误");
                    });

                    axios({
                        method: "get",
                        url: "/queryByTagCount?tag=" + tag
                    }).then(function(resp) {
                        articleList.count = resp.data.data[0].count;
                        articleList.generatePageTool;
                    });
                }
            }
        },
        // 分页
        generatePageTool: function () {
            var nowPage = this.page;
            var pageSize = this.pageSize;
            var totalCount = this.count;
            var result = [];
            result.push({text:"<<", page: 1});
            if (nowPage > 2) {
                result.push({text: nowPage - 2, page:nowPage - 2});
            }
            if (nowPage > 1) {
                result.push({text: nowPage - 1, page:nowPage - 1});
            }
            result.push({text: nowPage, page:nowPage});
            if (nowPage + 1 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({text:nowPage + 1, page: nowPage + 1});
            }
            if (nowPage + 2 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({text:nowPage + 2, page: nowPage + 2});
            }
            result.push({text:">>", page: parseInt((totalCount + pageSize - 1) / pageSize)});
            this.pageNumList = result;
            console.log(result);
            return result;
        }
    },
    created: function () {
        this.getPage(this.page,this.pageSize)
    }
});
var randomTags = new Vue({
   el:'#random_tags',
    data:{
       tags:['affds','fsdf','fsdaf','fadsf','fdsaf','fsd','fsd','fwef','affds','fsdf','fsdaf','fadsf','fdsaf','fsd','fsd','fwef'],
    },
    computed:{
        randomColor:function () {
            return function () {
                var red = Math.random() * 255;
                var green = Math.random() * 255;
                var blue = Math.random() * 255;
                return 'rgb(' + red + ',' + green + ',' + blue +  ')'
            }
        },
        randomSize:function () {
            return function () {
                var size = (Math.random() * 20 + 12) + 'px';
                return size;
            }
        }
    },
    created:{
        
    }
});

var newHot = new Vue({
    el:'#new_hot',
    data:{
        titleList:[
            {
                title:'这是一个链接',
                link:'http://www.baidu.com'
            },
            {
                title:'这是一个链接',
                link:'http://www.baidu.com'
            },
            {
                title:'这是一个链接',
                link:'http://www.baidu.com'
            },
            {
                title:'这是一个链接',
                link:'http://www.baidu.com'
            },
            {
                title:'这是一个链接',
                link:'http://www.baidu.com'
            }
        ]
    }
});

var newComments = new Vue({
    el:'#new_comments',
    data:{
        commentList:[
            {name:'这里是用户名',date:'2019-9-16',comment:'这里是一大串评论'},
            {name:'这里是用户名',date:'2019-9-16',comment:'这里是一大串评论'},
            {name:'这里是用户名',date:'2019-9-16',comment:'这里是一大串评论'},
            {name:'这里是用户名',date:'2019-9-16',comment:'这里是一大串评论'},
            {name:'这里是用户名',date:'2019-9-16',comment:'这里是一大串评论'},
        ]
    }
});

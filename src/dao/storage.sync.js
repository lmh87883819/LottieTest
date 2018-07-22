import Api from '../api/ajax'
import movieStorage from './movie'

export default sync = {
    // sync方法的名字必须和所存数据的key完全相同
    // 方法接受的参数为一整个object，所有参数从object中解构取出
    // 这里可以使用promise。或是使用普通回调函数，但需要调用resolve或reject。
    home(params) {
        console.log(new Date());
        let { id, resolve, reject, syncParams: { extraFetchOptions, someFlag } } = params;
        let BaseURL = extraFetchOptions.params
        Api.goHome()
            .then(data => {
                var movieItems = []
                var html = data.replace(/\s+/g, "")
                var movieType = html.split('<h3style="padding-left:10px;border-left:8pxsolid#00A6DE;">')    //按类别
                movieType.shift()
                for (let i = 0; i < movieType.length; i++) {
                    var typeArr = []
                    var type = (movieType[i].match(/(.*)：<\/h3>/))[1]  //视频种类
                    var movies = movieType[i].split('<divclass="movie-item">')
                    movies.shift()
                    for (let j = 0; j < movies.length; j++) {
                        var title = (movies[j].match(/title="(.*)"target/))[1]//标题
                        var href = BaseURL + (movies[j].match(/href="(.*)"><img/))[1]//网址
                        var img = (movies[j].match(/src="(.*)"><button/))[1]//图片
                        var updateTime = (movies[j].match(/#FF0000;">(.*?)<\/span><\/strong>/))[1]//更新时间
                        var tag = (movies[j].match(/class="hdtag">(.*?)<\/button><\/a>/))[1]//标签
                        var id = (href.match(/show\/(.*).html/))[1]
                        typeArr.push({id, title, href, img, updateTime, tag })
                    }
                    // console.log(typeArr);
                    movieItems.push({ type, items: typeArr })
                }
                // console.log(movieItems);
                // return movieItems;
                movieStorage.movieStorageSave('home', movieItems)
                resolve && resolve(movieItems)
            }).catch(err => {
                console.log(err);
                reject && reject(err)
            })
    },
}
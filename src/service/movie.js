import Api from '../api/ajax'
import {BaseURL} from '../config'
import movieStorage from '../dao/movie'

export default movieService = {
    init : () => {
        Api.goHome()
            .then(data => {
                var movieItems = []
                var html = data.replace(/\s+/g, "")
                var movieType = html.split('<h3style="padding-left:10px;border-left:8pxsolid#00A6DE;">')    //按类别
                movieType.shift()    //主页头部，用于解析出type
                for (let i = 0; i < movieType.length; i++) {
                    var typeArr = []
                    var type = (movieType[i].match(/(.*)：<\/h3>/))[1]  //视频种类
                    var movies = movieType[i].split('<divclass="movie-item">')
                    movies.shift()
                    for (let j = 0; j < movies.length; j++) {
                        var title = (movies[j].match(/title="(.*)"target/))[1]//标题
                        var href = BaseURL + (movies[j].match(/href="(.*)"><img/))//网址
                        var img = (movies[j].match(/src="(.*)"><button/))[1]//图片
                        typeArr.push({ title, href, img })
                    }
                    // console.log(typeArr);
                    movieItems.push({ type, items: typeArr })
                }
                // console.log(movieItems);
                // return movieItems;
                movieStorage.movieStorageSave('home',movieItems)
        })
    }
}
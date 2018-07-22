import Api from '../api/ajax'
import { BaseURL } from '../config'
import movieStorage from '../dao/movie'

export default movieService = {
    //主页数据处理
    goHome: () => {
        return movieStorage.movieStorageLoad('home', BaseURL)
    },
    //根据类型及页码获取数据并处理
    getMovieByTypeAndPage: async (type, pageNum) => {
        //判断本地存储中是否有数据
        var movies = await movieStorage.movieStorageLoadWithPage(type, pageNum)
        // console.log(movies);
        if (movies) {
            return Promise.resolve(movies)
        } else {
            console.log(new Date());
            var data = await Api.getMovieByTypeAndPage(type, pageNum)
            var movieItems = []
            var html = data.replace(/\s+/g, "")
            var movies = html.split('<divclass="movie-item">')
            movies.shift()
            for (let j = 0; j < movies.length; j++) {
                var title = (movies[j].match(/title="(.*?)"target/))[1]//标题
                var href = BaseURL + (movies[j].match(/href="(.*?)"><img/))[1]//网址
                var img = (movies[j].match(/src="(.*?)"height/))[1]//图片
                var updateTime = (movies[j].match(/更新时间：(.*?)<\/div><\/div>/))[1]//更新时间
                var tag = (movies[j].match(/class="hdtag">(.*?)<\/button><\/a>/))[1]//标签
                var id = (href.match(/show\/(.*).html/))[1]//影片编号
                movieItems.push({id, title, href, img, updateTime, tag })
            }
            // console.log(movieItems);
            movieStorage.movieStorageSaveWithPage(type, pageNum, movieItems)
            return Promise.resolve(movieItems)
        }
    },
    //获取影片详情
    getMovieDetails : async (href,id) =>{
        //判断本地存储中是否有数据
        var movies = await movieStorage.movieStorageLoad(id)
        console.log(movies);
        if (movies) {
            return Promise.resolve(movies)
        } else {
            console.log(new Date());
            var data = await Api.getMovieDetails(href)
            var html = data.replace(/\s+/g, "")
            // console.log(html);
            var arr = html.split('<divclass="row"')
            var movieName = (arr[1].match(/movie-title">(.*?)<spanclass/))[1]//电影名
            var movieDate = (arr[1].match(/\((.*?)\)/))[1]//上映时间
            var director = (arr[2].match(/导演<\/span><\/td><td>(.*?)</))[1]//导演
            var performer = (arr[2].match(/="position:relative;">(.*?)</))[1]//主演
            var filmGenres = (arr[2].match(/类型<\/span><\/td><td>(.*?)</))[1]//电影类型
            var filmCountry = (arr[2].match(/制片国家<\/span><\/td><td>(.*?)</))[1]//制片国家
            var status = (arr[2].match(/更新状态<\/span><\/td><td>(.*?)</))[1]//更新状态
            var releasDate = (arr[2].match(/上映日期<\/span><\/td><td>(.*?)</))[1]//上映日期
            var point = (arr[2].match(/target="_blank"href="\/">(.*?)</))[1]//豆瓣评分
            var summary = (arr[2].match(/summary">(.*?)</))[1]//豆瓣评分
            var movieDetails = {   
                movieName,
                movieDate,
                director,
                performer,
                filmGenres,
                filmCountry,
                status,
                releasDate,
                point,
                summary   }
            movieStorage.movieStorageSave(id,movieDetails)
            return Promise.resolve(movieDetails)
        }
    },
    //获取影片地址
    getMovieResource : async (id,num) => {
        //判断本地存储中是否有数据
        var movieResource = await movieStorage.movieStorageLoadWithPage(id, num)
        console.log(movieResource);
        if (movieResource) {
            return Promise.resolve(movieResource)
        } else {
            var allHtml = await Api.getMovieResource(id,num)
            var html = allHtml.replace(/\s+/g, "")
            var script = (html.match(/yer"><scripttype="text\/javascript"src="(.*?)">/))[1]
            var iframe = await Api.getMovieDetails(script)
            var movieKey = (iframe.match(/src="(.*?)"/))[1]
            var movie = await Api.getMovieDetails(movieKey)
            var movieKey2 = (movie.match(/o" src="(.*?)"/))[1]
            var movie2 = await Api.getMovieDetails(movieKey2)
            movieStorage.movieStorageSaveWithPage(id,num,movie2)
            console.log(movieKey2);
            return Promise.resolve(movieKey2)
        }
    }
}
import storage from './storage'

//movie模块storage操作
export default movieStorage = {
    //根据key缓存数据
    movieStorageSave (key,data){
        return new Promise((resolve,reject)=>{
            storage.save({
                key,data,
            })
        })
    },
    //根据类型及页码缓存数据
    movieStorageSaveWithPage (key,id,data){
        return new Promise((resolve,reject) => {
            storage.save({
                key,id,data
            })
        })
    },
    //根据key获取数据
    movieStorageLoad (key,params){
        // load
        return new Promise((resolve,reject)=>{
            storage.load({
                key:key,
                autoSync: true,
                syncInBackground: false,
                syncParams: {
                    extraFetchOptions: {
                        params:params
                    },
                    someFlag: true,
                },
            }).then(res => {
                resolve(res)
            }).catch(err => {
                //console.log(err)
                resolve(null)
            })
        })
    },
    //根据类型及页码获取缓存数据
    movieStorageLoadWithPage (key,id,params){
        // load
        console.log(key,id);
        return new Promise((resolve,reject)=>{
            storage.load({
                key,id,
                autoSync: true,
                syncInBackground: false,
                syncParams: {
                    extraFetchOptions: {
                        params:params
                    },
                    someFlag: true,
                },
            }).then(res => {
                resolve(res)
            }).catch(err => {
                resolve(null)
            })
        })
    },
    clearAll (key){
        storage.remove({
            key,id:1
            // key
        });
    }
}



// storage.getIdsForKey('user').then(ids => {
//     console.log(ids);
// });

// storage.getAllDataForKey('user').then(users => {
//     console.log(users);
// });

// storage.clearMapForKey('user');

// storage.remove({
//     key: 'lastPage'
// });
// storage.remove({
//     key: 'user',
//     id: '1001'
// });


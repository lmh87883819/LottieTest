import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

var storage = new Storage({
    // maximum capacity, default 1000 
    size: 1000,

    // Use AsyncStorage for RN, or window.localStorage for web.
    // If not set, data would be lost after reload.
    storageBackend: AsyncStorage,
    
    // expire time, default 1 day(1000 * 3600 * 24 milliseconds).
    // can be null, which means never expire.
    defaultExpires: 1000 * 3600 * 24,
    
    // cache data in the memory. default is true.
    enableCache: true,
    
    // if data was not found in storage or expired,
    // the corresponding sync method will be invoked and return 
    // the latest data.
    sync : {
        // we'll talk about the details later.
    }
})	

//movie模块storage操作
export default movieStorage = {
    movieStorageSave (key,data){
        return new Promise((resolve,reject)=>{
            storage.save({
                key,data,
            });
        })
    },
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
                console.log(err);
            })
        })
    },
    clearAll (){
        storage.clearMap();
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


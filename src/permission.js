import router from './router';
import {getUserInfo} from './api/login'
router.beforeEach((to, from ,next) =>{
    const token = localStorage.getItem('rmms-user-token');
    //没有token
    if(!token){
        if(to.path != '/login'){
            next({path:'/login'})
        }else{
            next()
        }
    }else{
        //有token
        if(to.path=='/login'){
            next()
        }else{
            //判断是否有用户信息
            if(localStorage.getItem('rmms-user')){
                next();
            }else{
                getUserInfo(token).then(res => {
                    const userData = res.data;
                    if(userData.flag){
                        localStorage.setItem('rmms-user',JSON.stringify(userData.data))
                        next()
                    }else{
                        next({path:'/login'})
                    }
                })
            }
        }
    }
})


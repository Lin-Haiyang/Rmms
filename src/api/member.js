import request from '@/util/request';


export default {
    getMemberList(){
        return request({
            url:'/member/list',
            method:'get',
        })
    }
}

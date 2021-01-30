import request from '@/util/request';

export default {
    getList(){
        const req = request({
            url: '/db.json',
            method:'get'
        })
        return req;
    }
}
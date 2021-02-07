import request from '@/util/request';


export default {
    // 获取会员列表
    getMemberList(){
        return request({
            url:'/member/list',
            method:'get',
        })
    },
    // 通过分页获取会员列表
    getMemberPageList(currentPage,pageSize,searchMap){
        return request({
            url:`/member/list/search/${currentPage}/${pageSize}`,
            method:'post',
            data:searchMap
        })
    },
    // 新增会员
    addMember(addData){
        return request({
            url:'/member',
            method:'post',
            data:addData
        })
    },
    // 通过ID获取会员信息
    getById(id){
        return request({
            url:`/member/${id}`,
            method:'get'
        })
    },
    // 修改会员信息
    changeMember(msg){
        return request({
            url:`/member/${msg.id}`,
            method:'post',
            data:msg
        })
    },
    deleteById(id){
        return request({
            url:`/member/${id}`,
            method:'delete'
        })
    }
}

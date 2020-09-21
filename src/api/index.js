import ajax from './ajax';

const prefix = '/api';

function login(data){
    return ajax({
        method:'POST',
        data,
        url:`${prefix}/user/login`,
        login:true
    })
}

function wechatQuery(data={
    page_num:1,
    page_size:9999
}){
    return ajax({
        method:'POST',
        data,
        url:`${prefix}/addressbook_phone/query`,
    })
}


export default {
    login,
    wechatQuery
}
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


export default {
    login
}
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

function confirmMeeting(data){
    return ajax({
        method:'POST',
        data,
        url:`${prefix}/backgroundinterface/meeting_appointment/findXinheTemporary`
    })
}
function findMeeting(data){
    return ajax({
        method:'POST',
        data,
        url:`${prefix}/backgroundinterface/meeting_appointment/findMeetingRoomAppointment`,
    })
}
function meetingList(data){
    return ajax({
        method:'POST',
        data,
        url:`${prefix}/backgroundinterface/meeting_appointment/list`,
    })
}

function makeMeeting(data){
    return ajax({
        method:'POST',
        data,
        url:`${prefix}/backgroundinterface/meeting_appointment/appointment`,
    })
}
export default {
    login,
    wechatQuery,
    confirmMeeting,
    findMeeting,
    meetingList,
    makeMeeting 
}
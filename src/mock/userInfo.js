let userInfoList = [{
  id:'1-1',
  checkeds:true,
  name:'总裁办'
},
{
  id:'1-2',
  checkeds:false,
  name:'财务室'
},
{
  id:'1-3',
  checkeds:false,
  name:'投资管理部'
},
{
  id:'1-4',
  checkeds:false,
  name:'产品事业部'
}]

export default {
  'get|/parameter/query': option => {
    return {
      status: 200,
      message: 'success',
      data: userInfoList
    };
  }
}
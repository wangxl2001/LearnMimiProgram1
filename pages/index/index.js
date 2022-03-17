const DB = wx.cloud.database() // 创建数据库实例
const _ = DB.command

Page({

  data: {
    message: 'hello world!',
    banners: [],
    recommends: []
  },


 

  onLoad: function() {


    
    const db2 = this.getMultiData();
    db2.then(res => {
      console.log(res);
      
      const banners = res.data.data.banner.list;
      const recommends = res.data.data.recommend.list;
      this.setData({
        banners: banners,
        recommends: recommends
      })
    })
  },



  onChangePage() {
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })
  },

  getMultiData() {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'http://152.136.185.210:8000/home/multidata',
        success: resolve,
        fail: reject,        
      })
    })
  },

  //查找
  findData() {
    DB.collection("list").where({
      age: _.lt(15)
    }).get({
      success(res) {
        console.log(res)
      }
    })
  },

  //添加
  addData() {
      DB.collection("list").add({
        data: {
        name: "孙悟空",
        age: 18,
        },
        success(res) {
          console.log(res)            
        }
      })
  },

  //删除
  RemoveData() {
    DB.collection("list").doc('75777da85ed10a1e00031e0802db2be4').remove({
      success: function(res) {
        console.log(res.data)
      }
    })
  },

  //更新
  UpdateData() {
    DB.collection('list').doc('baada3ac5ed10a5d0003fc11290198a6').update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        sex: 'male'
      },
      success: function(res) {
        console.log(res.data)
      }
    }) 
  } 
})
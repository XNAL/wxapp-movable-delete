//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    productList: [
      {
        id: 1,
        name: '产品一',
        code: 100001,
        amount: 1
      },
      {
        id: 2,
        name: '产品二',
        code: 100002,
        amount: 5
      },
      {
        id: 3,
        name: '产品三',
        code: 300001,
        amount: 10
      }
    ],
    slideProductList: [
      {
        id: 4,
        name: '产品五',
        code: 400001,
        amount: 101
      },
      {
        id: 5,
        name: '产品六',
        code: 500002,
        amount: 500
      },
      {
        id: 6,
        name: '产品七',
        code: 600001,
        amount: 110
      }
    ]
  },

  onLoad: function () {

  },

  /**
   * 显示删除按钮
   */
  showDeleteButton: function (e) {
    let productIndex = e.currentTarget.dataset.productindex
    this.setXmove(productIndex, -65)
  },

  /**
   * 隐藏删除按钮
   */
  hideDeleteButton: function (e) {
    let productIndex = e.currentTarget.dataset.productindex

    this.setXmove(productIndex, 0)
  },

  /**
   * 设置movable-view位移
   */
  setXmove: function (productIndex, xmove) {
    let productList = this.data.productList
    productList[productIndex].xmove = xmove

    this.setData({
      productList: productList
    })
  },

  /**
   * 处理movable-view移动事件
   */
  handleMovableChange: function (e) {
    if (e.detail.source === 'friction') {
      if (e.detail.x < -30) {
        this.showDeleteButton(e)
      } else {
        this.hideDeleteButton(e)
      }
    } else if (e.detail.source === 'out-of-bounds' && e.detail.x === 0) {
      this.hideDeleteButton(e)
    }
  },

  /**
   * 删除产品
   */
  handleDeleteProduct: function ({ currentTarget: { dataset: { id } } }) {
    let productList = this.data.productList
    let productIndex = productList.findIndex(item => item.id = id)

    productList.splice(productIndex, 1)

    this.setData({
      productList
    })
    if (productList[productIndex]) {
      this.setXmove(productIndex, 0)
    }
  },

  /**
   * slide-delete 删除产品
   */
  handleSlideDelete({ detail: { id } }) {
    let slideProductList = this.data.slideProductList
    let productIndex = slideProductList.findIndex(item => item.id = id)

    slideProductList.splice(productIndex, 1)

    this.setData({
      slideProductList
    })
  },

  /**
   * 处理touchstart事件
   */
  handleTouchStart(e) {
    this.startX = e.changedTouches[0].pageX
  },

  /**
   * 处理touchend事件
   */
  handleTouchEnd(e) {
    if(e.changedTouches[0].pageX < this.startX && e.changedTouches[0].pageX - this.startX <= -30) {
      this.showDeleteButton(e)
    } else if(e.changedTouches[0].pageX > this.startX && e.changedTouches[0].pageX - this.startX < 30) {
      this.showDeleteButton(e)
    } else {
      this.hideDeleteButton(e)
    }
  }
})


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pid: {
      type: Number,
      value: 0,
      observer(newVal) {
        if(newVal) {
          this.setData({
              animate: true
          }, () => {
              this.setData({
                  translateX: 0
              })
          })
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    translateX: 0,
    animate: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTouchStart(e) {
      this.setData({
        animate: false
      }, () => {
        this.touchStartX = e.changedTouches[0].pageX
        this.touchStartY = e.changedTouches[0].pageY
        this.startX = this.data.translateX
        this.direction = null
        this.movedX = null
      })
    },

    handleTouchMove: function (e) {
      this.touchMoveX = e.changedTouches[0].pageX
      this.touchMoveY = e.changedTouches[0].pageY
      this.moveX = this.touchMoveX - this.touchStartX

      if(Math.abs(this.touchMoveY - this.touchStartY) > Math.abs(this.moveX)) {
        return
      }
      if(this.moveX > 0) {
        this.direction = 'right'
      } else {
        this.direction = 'left'
      }

      if(this.startX === 0 && this.direction === 'right') {
        return
      }
      if(this.startX === -this.actionWidth && this.direction === 'left') {
        return
      } else if(Math.abs(this.moveX) >= this.actionWidth) {
        this.moveX = this.moveX < 0 ? -this.actionWidth : this.actionWidth
        this.setData({
          translateX: this.moveX
        })
      } else {
        this.setData({
          translateX: this.touchMoveX - this.touchStartX + this.startX
        })
      }
    },

    handleTouchEnd: function (e) {
      let translateX = 0
      if(this.moveX + this.startX >= 0) {
        translateX = 0
      } else if(this.moveX + this.startX <= -this.actionWidth) {
        translateX = -this.actionWidth
      } else {
        if((this.startX === 0 && Math.abs(this.moveX) < this.actionWidth / 2) || (this.startX === -this.actionWidth && Math.abs(this.moveX) > this.actionWidth / 2)) {
          translateX = 0
        } else {
          translateX = -this.actionWidth
        }
      }
      this.setData({
          animate: true
      }, () => {
          this.setData({
              translateX
          })
      })
    },

    handleAction({ currentTarget: { dataset: data } }) {
      this.triggerEvent('action', {
        type: data.type,
        id: this.data.pid
      })
    }
  },

  ready() {
    this.actionWidth = 60
  }
})
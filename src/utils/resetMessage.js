import { MessageBox } from 'element-ui'

class MsgBox {
    constructor() {
        this.isLoging = false
    }
    /**
     * 弹窗
     * @param {Object} param messageBox的参数
     */
    dialog(param) {
        if (!this.isLoging) {
            this.isLoging = true
            const _this = this

            MessageBox({
                showCancelButton: true,
                title: param.title,
                type: param.type,
                message: param.message,
                confirmButtonText: param.confirmButtonText,
                cancelButtonText: param.cancelButtonText
                // 等等别的参数...
            }).then(() => {
                param.callback()
                _this.isLoging = false // 点击确认关闭弹窗后 重置
            })
        }
    }
}

export const msgBox = new MsgBox()

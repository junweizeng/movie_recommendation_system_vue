import {ElMessage} from "element-plus";

export function SuccessMessage(msg) {
    return ElMessage({
        type: 'success',
        message: msg,
        showClose: true
    })
}

export function ErrorMessage(msg) {
    return ElMessage({
        type: 'error',
        message: msg,
        showClose: true
    })
}
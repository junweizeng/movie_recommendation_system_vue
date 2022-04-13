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

export function InfoMessage(msg) {
    return ElMessage({
        type: 'info',
        message: msg,
        showClose: true
    })
}

export function WarningMessage(msg) {
    return ElMessage({
        type: 'warning',
        message: msg,
        showClose: true
    })
}
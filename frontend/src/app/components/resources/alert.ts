import Swal from 'sweetalert2'

export function successDialog(text: string) {
    return Swal.fire({
        position: 'center',
        icon: 'success',
        text: text,
        showConfirmButton: false,
        timer: 1500
    })
}

export function warningMessage(text: string) {
    return Swal.fire({
        position: 'center',
        icon: 'warning',
        text: text,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#2AAA0B',
        showCloseButton: true,
    })
}

export function errorMessage(text: string) {
    return Swal.fire({
        position: 'center',
        icon: 'error',
        text: text,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#2AAA0B',
        showCloseButton: true,
    })
}

export function confirmDialog(text: string, cancel: string, confirm: string) {
    return Swal.fire({
        position: 'center',
        icon: 'warning',
        text: text,
        showCancelButton: true,
        cancelButtonText: cancel,
        cancelButtonColor: '#E70A0A',
        showConfirmButton: true,
        confirmButtonText: confirm,
        confirmButtonColor: '#2AAA0B',
        showCloseButton: true,
        
        
    })
}
export function okDialog(text: string, confirm: string) {
    return Swal.fire({
        position: 'center',
        icon: 'success',
        text: text,
        showConfirmButton: true,
        confirmButtonText: confirm,
        confirmButtonColor: '#2AAA0B',
        showCloseButton: true,
        
        
    })
}
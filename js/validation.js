export class Validation {
    required(value, messageError, errorId) {
        const element = document.getElementById(errorId)

        //Trường hợp value bị lỗi
        if (value.trim() === '') {
            element.innerHTML = messageError
            element.style.display = 'block'
            return false
        }
        element.innerHTML = ''
        element.style.display = 'none'
        return true
    }

    minLength(value, minLength, messageError, errorId) {
        const element = document.getElementById(errorId)
        if (value.length < minLength) {

            element.innerHTML = messageError
            element.style.display = 'block'
            return false
        }
        element.innerHTML = ''
        element.style.display = 'none'
        return true
    }
    maxLength ( value, maxLength, messageError, errorId){
        const element = document.getElementById(errorId)
        if (value.length > maxLength) {

            element.innerHTML = messageError
            element.style.display = 'block'
            return false
        }
        element.innerHTML = ''
        element.style.display = 'none'
        return true
    }
    isText = function (value, messageError, errorId) {
        const element = document.getElementById(errorId);
        const regex =/^[A-Za-zÀ-ỹ\s]+$/
    
        if (regex.test(value.trim())) {
            element.innerHTML = '';
            element.style.display = 'none';
            return true;
        }
    
        element.innerHTML = messageError;
        element.style.display = 'block';
        return false;
    };
    

    isAccount = function (value, messageError, errorId) {
        const element = document.getElementById(errorId);
        const regex = /^(?=.*[0-9])(?=.*[A-Za-z])[A-Za-z0-9]*$/; // Yêu cầu cả số và chữ
        if (regex.test(value)) {
            element.innerHTML = '';
            element.style.display = 'none';
            return true;
        }
        element.innerHTML = messageError;
        element.style.display = 'block';
        return false;
    };

    isMail(value, messageError, errorId){
        const element = document.getElementById(errorId);
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        if (regex.test(value)) {
            element.innerHTML = '';
            element.style.display = 'none';
            return true;
        }
        element.innerHTML = messageError;
        element.style.display = 'block';
        return false;


    }
    isPassword(value, messageError, errorId) {
        const element = document.getElementById(errorId);
        const regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-zA-Z]).{6,10}$/;
    
        if (regex.test(value)) {
            element.innerHTML = '';
            element.style.display = 'none';
            return true;
        }
    
        element.innerHTML = messageError;
        element.style.display = 'block';
        return false;
    }
    
    isLuongCB(value, minLuong, maxLuong, messageError, errorId) {
        const element = document.getElementById(errorId);
        
        if (isNaN(value) || value < minLuong || value > maxLuong) {
            element.innerHTML = messageError;
            element.style.display = 'block';
            return false;
        }
    
        element.innerHTML = '';
        element.style.display = 'none';
        return true;
    }
    //Kiểm tra tài khoản tồn tại
    
    isAccountExist(value, arrNhanVien, messageError, errorId) {
        const element = document.getElementById(errorId);
    
        const isExist = arrNhanVien.some(nhanVien => nhanVien.tknv === value);
    
        if (isExist) {
            element.innerHTML = messageError;
            element.style.display = 'block';
            return false;
        } else {
            element.innerHTML = '';
            element.style.display = 'none';
            return true;
        }
    }
     
   resetValidation(){
    const errorElements = document.querySelectorAll('.sp-thongbao')
    errorElements.forEach(element =>{
        element.innerHTML = ''
        element.style.display = 'none'
    })
   }


}
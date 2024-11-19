export class List {
    arrNhanVien = [];
    constructor() {}
    //Kiểm tra tài khoản có trùng hay không
    
    isAccount(tknv){
        return this.arrNhanVien.some(nhanVien => nhanVien.tknv === tknv)
    }


    addNhanVien(nhanVien) {
        this.arrNhanVien.push(nhanVien);
    }

    deleteNhanVien(tknv) {
        const index = this.arrNhanVien.findIndex((nhanVien) => nhanVien.tknv === tknv);
        if (index !== -1) {
            this.arrNhanVien.splice(index, 1);
        }
    }
    
    // Cập nhật nhân viên

    updateNhanVien(nhanVien) {
        const index = this.arrNhanVien.findIndex((item) => item.tknv === nhanVien.tknv);
        if (index !== -1) {
            this.arrNhanVien[index] = nhanVien;
        }
    }

  
    
}
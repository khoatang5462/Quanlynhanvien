import { nhanvien } from './modal.js';
import { List } from './nhanvienlist.js';
import { Validation } from './validation.js'

// Tạo đối tượng quản lý list
const list = new List();
// console.log("list: ", list);

// Tạo đối tượng validation
const validation = new Validation()

const layThongTin = () => {
    const elements = document.querySelectorAll('#staffForm input, #staffForm select');
    console.log("elements: ", elements);

    let nguoiDung = {};
    elements.forEach((element) => {
        const id = element.id;
        nguoiDung[id] = element.value;
    });
    // console.log("nguoiDung: ", nguoiDung);

    // Khởi tạo đối tượng
    const nhanVien = new nhanvien(
        nguoiDung.tknv,
        nguoiDung.name,
        nguoiDung.email,
        nguoiDung.password,
        nguoiDung.datepicker,
        nguoiDung.luongCB,
        nguoiDung.chucvu,
        nguoiDung.gioLam
    );
    return nhanVien;

};

//======================


const renderNhanVien = (arrNhanVien = list.arrNhanVien) => {
    let contentHtml = '';
    arrNhanVien.forEach((nhanVien) => {
        contentHtml += `
        <tr>
        <td>${nhanVien.tknv}</td>
        <td>${nhanVien.name}</td>
        <td>${nhanVien.email}</td>
        <td>${nhanVien.datepicker}</td>
        <td>${nhanVien.mappingChucVu()}</td>
        <td>${nhanVien.tinhLuong()}</td>
        <td>${nhanVien.xepLoai()}</td>
        <td>
        <button class="btn btn-success w-100 my-1" data-toggle="modal"	data-target="#myModal" onclick = "btnTuyChinh('${nhanVien.tknv}')">Tùy chỉnh</button>
        <button class="btn btn-danger w-100" onclick="btnDelete('${nhanVien.tknv}')">Xóa</button>
        </td>
        </tr>
        `;
    });
    document.getElementById('tableDanhSach').innerHTML = contentHtml;
};

//============================



// Lưu vào localStorage
const setLocalStorage = () => {
    localStorage.setItem("arrNhanVien", JSON.stringify(list.arrNhanVien));
};

// Lấy dữ liệu từ localStorage và render
const renderLocalStorage = () => {
    let arrNhanVien = localStorage.getItem('arrNhanVien');
    if (arrNhanVien) {
        arrNhanVien = JSON.parse(arrNhanVien);
        // Khởi tạo lại các đối tượng nhanVien từ dữ liệu JSON
        list.arrNhanVien = arrNhanVien.map((nguoiDung) => {
            return new nhanvien(
                nguoiDung.tknv,
                nguoiDung.name,
                nguoiDung.email,
                nguoiDung.password,
                nguoiDung.datepicker,
                nguoiDung.luongCB,
                nguoiDung.chucvu,
                nguoiDung.gioLam
            );
        });
        // Hiển thị ra UI
        renderNhanVien(list.arrNhanVien);
    }
};

renderLocalStorage();

// xóa nhân viên
window.btnDelete = (tknv) => {
    list.deleteNhanVien(tknv)

    //hien danh sach xoa ra ui
    renderNhanVien()

    //luu lai danh sach xoa
    setLocalStorage()
};


//tuy chinh nhan vien

window.btnTuyChinh = (tknv) => {
    // console.log("tknv: ", tknv);
    const editNhanVien = list.arrNhanVien.find((item) => item.tknv === tknv)


    //thay doi title
    document.getElementById('header-title').textContent = 'Cập nhật'

    //an btn them nguoi dung
    document.getElementById('btnThemNV').style.display = 'none'

    //them data-action
    document.getElementById('staffForm').setAttribute('data-action', 'edit')

    //disable input tknv
    document.getElementById('tknv').disabled = true

    //hien btn cap nhat
    document.getElementById('btnCapNhat').style.display = 'inline-block'
    // console.log("editNhanVien: ", editNhanVien);

    // render thong tin lai form
    const elements = document.querySelectorAll('#staffForm input, #staffForm select');
    elements.forEach(element => {
        const { id } = element
        element.value = editNhanVien[id]
    });
    //reset validation
    validation.resetValidation()



}

//=================================
document.getElementById('btnThem').onclick = () => {
    const formElement = document.getElementById('staffForm')
    //reset validation
    validation.resetValidation()
    //reset form
    formElement.reset()

    document.getElementById('tknv').disabled = false

    // an btn cap nhat
    document.getElementById('btnCapNhat').style.display = 'none'
    document.getElementById('header-title').textContent = 'Log in'

    // an btn cap nhat
    document.getElementById('btnCapNhat').style.display = 'none'

    //hien btn them nguoi dung
    document.getElementById('btnThemNV').style.display = 'inline-block'



}


// ==================================
document.getElementById('staffForm').onsubmit = function (e) {
    e.preventDefault();

    //kiem tra là thêm mới hay chình sửa
    const formElement = document.getElementById('staffForm')

    const action = formElement.getAttribute('data-action', 'edit');
    const nhanVien = layThongTin();


    //============validation========
    let isValid = true
    if (nhanVien)

        if (action !== 'edit') {
            // Kiểm tra tknv

            isValid &= validation.required(nhanVien.tknv, "Vui lòng điền thông tin!", 'tbTKNV')
                && validation.minLength(nhanVien.tknv, 4, 'Tài khoản phải từ 4 ký tự!', 'tbTKNV')
                && validation.maxLength(nhanVien.tknv, 6, "Tài khoản không quá 6 ký tự!", 'tbTKNV')
                && validation.isAccount(nhanVien.tknv, 'Tài khoản phải có số và chữ!', 'tbTKNV')
                && validation.isAccountExist(nhanVien.tknv, list.arrNhanVien, 'Tài khoản đã tồn tại!', 'tbTKNV')

            // Kiểm tra tên
            isValid &= validation.required(nhanVien.name, 'Vui lòng điền thông tin!', 'tbTen')
                && validation.isText(nhanVien.name, "Không nhập số!", 'tbTen')

            //Kiểm tra mail
            isValid &= validation.required(nhanVien.email, 'Vui lòng điền email', 'tbEmail')
                && validation.isMail(nhanVien.email, 'Email chưa đúng định dạng', 'tbEmail')

            // Kiểm tra password
            isValid &= validation.required(nhanVien.password, 'Vui lòng điền mật khẩu!', 'tbMatKhau')
                && validation.minLength(nhanVien.password, 6, 'Mật khẩu ít nhất 6 ký tự!', 'tbMatKhau')
                && validation.maxLength(nhanVien.password, 10, 'Mật khẩu không quá 10 ký tự!', 'tbMatKhau')
                && validation.isPassword(nhanVien.password, 'Mật khẩu phải chứa ít nhất 1 số, 1 ký tự in hoa và 1 ký tự đặc biệt!', 'tbMatKhau');

            //Kiểm tra input ngày làm
            isValid &= validation.required(nhanVien.datepicker, 'Vui lòng chọn ngày làm!', 'tbNgay')

            //Kiểm tra lương
            isValid &= validation.required(nhanVien.luongCB, "Vui lòng điền lương", 'tbLuongCB')
                && validation.isLuongCB(nhanVien.luongCB, 1000000, 20000000,
                    'Lương cơ bản phải nằm trong khoảng 1,000,000 đến 20,000,000', 'tbLuongCB')

            //Kiểm tra chức vụ
            isValid &= validation.required(nhanVien.chucvu, "Vui lòng chọn chức vụ", 'tbChucVu')

            //Kiểm tra giờ làm

            isValid &= validation.required(nhanVien.gioLam, 'Vui lòng điền giờ làm!', 'tbGiolam')

            if (!isValid) return;

            // Thêm nhân viên
            list.addNhanVien(nhanVien);
        }
    if (action === 'edit') {
        // Kiểm tra tknv

        isValid &= validation.required(nhanVien.tknv, "Vui lòng điền thông tin!", 'tbTKNV')
            && validation.minLength(nhanVien.tknv, 4, 'Tài khoản phải từ 4 ký tự!', 'tbTKNV')
            && validation.maxLength(nhanVien.tknv, 6, "Tài khoản không quá 6 ký tự!", 'tbTKNV')
            && validation.isAccount(nhanVien.tknv, 'Tài khoản phải có số và chữ!', 'tbTKNV')

        // Kiểm tra tên
        isValid &= validation.required(nhanVien.name, 'Vui lòng điền thông tin!', 'tbTen')
            && validation.isText(nhanVien.name, "Không nhập số!", 'tbTen')

        //Kiểm tra mail
        isValid &= validation.required(nhanVien.email, 'Vui lòng điền email', 'tbEmail')
            && validation.isMail(nhanVien.email, 'Email chưa đúng định dạng', 'tbEmail')

        // Kiểm tra password
        isValid &= validation.required(nhanVien.password, 'Vui lòng điền mật khẩu!', 'tbMatKhau')
            && validation.minLength(nhanVien.password, 6, 'Mật khẩu ít nhất 6 ký tự!', 'tbMatKhau')
            && validation.maxLength(nhanVien.password, 10, 'Mật khẩu không quá 10 ký tự!', 'tbMatKhau')
            && validation.isPassword(nhanVien.password, 'Mật khẩu phải chứa ít nhất 1 số, 1 ký tự in hoa và 1 ký tự đặc biệt!', 'tbMatKhau');

        //Kiểm tra input ngày làm
        isValid &= validation.required(nhanVien.datepicker, 'Vui lòng chọn ngày làm!', 'tbNgay')

        //Kiểm tra lương
        isValid &= validation.required(nhanVien.luongCB, "Vui lòng điền lương", 'tbLuongCB')
            && validation.isLuongCB(nhanVien.luongCB, 1000000, 20000000,
                'Lương cơ bản phải nằm trong khoảng 1,000,000 đến 20,000,000', 'tbLuongCB')

        //Kiểm tra chức vụ
        isValid &= validation.required(nhanVien.chucvu, "Vui lòng chọn chức vụ", 'tbChucVu')

        //Kiểm tra giờ làm

        isValid &= validation.required(nhanVien.gioLam, 'Vui lòng điền giờ làm!', 'tbGiolam')

        if (!isValid) return;

        //Cập nhật nhân viên 
        list.updateNhanVien(nhanVien)
        //thay doi title
        document.getElementById('header-title').textContent = 'Log in'
    }

    //xoa thuoc tinh data-actiom
    formElement.removeAttribute('data-action', 'edit')

    //reset form

    formElement.reset()

    //dong modal
    document.getElementById('btnDong').click()


    // Lưu vào localStorage
    setLocalStorage();
    // console.log(list.arrNhanVien);


    // Hiển thị UI
    renderNhanVien();
};
//=========showhide password==========
let eyeIcon = document.querySelector('.bi.bi-eye-fill');
let password = document.getElementById('password')

eyeIcon.onclick = function () {
    if (password.type === "password") {
        password.type = "text";
        eyeIcon.classList.replace("bi-eye-fill", "bi-eye-slash-fill"); // Correct class names
    } else {
        password.type = "password";
        eyeIcon.classList.replace("bi-eye-slash-fill", "bi-eye-fill"); // Correct class names
    }
};


//================
document.getElementById('searchName').oninput = function timLoai() {
    const searchName = document.getElementById('searchName').value.trim();
    if (!searchName) {
        renderNhanVien(list.arrNhanVien);
        return;
    }

    const search = list.arrNhanVien.filter((nhanVien) => {
        return nhanVien.xepLoai().toLowerCase().includes(searchName.toLowerCase());
    });

    if (search.length === 0) {
        document.getElementById('tableDanhSach').innerHTML = `
            <tr>
                <td colspan="8" class="text-center">Không tìm thấy nhân viên nào phù hợp!</td>
            </tr>
        `;
    } else {
        renderNhanVien(search);
    }
};

// Show/hide password onClick of button using Javascript only

// https://stackoverflow.com/questions/31224651/show-hide-password-onclick-of-button-using-javascript-only

var pwShown = 0;

function show() {
  var p = document.getElementById('password');
  p.setAttribute('type', 'text');
}

function hide() {
  var p = document.getElementById('password');
  p.setAttribute('type', 'password');
}

function showHide() {
  document.getElementById("eye").addEventListener("click", function() {
    if (pwShown == 0) {
      pwShown = 1;
      show();
    } else {
      pwShown = 0;
      hide();
    }
  }, false);
}


//   font-family: 'Vibur', cursive;
//   font-family: 'Abel', sans-serif;
// font-family: 'Pacifico', cursive;
// font-family: 'Dancing Script', cursive;
// font-family: 'Alegreya', serif;
// font-family: 'Abril Fatface', cursive;
// font-family: 'Playball', cursive;
// font-family: 'Unica One', cursive;
// font-family: 'Oleo Script', cursive;
// font-family: 'Share', cursive;
// font-family: 'Overlock', cursive;
// font-family: 'Arima Madurai', cursive;
// font-family: 'Playfair Display', serif;
// font-family: 'Merriweather', serif;
// font-family: 'PT Serif', serif;
// font-family: 'Dosis', sans-serif;
export class nhanvien {
    constructor(_tknv, _name, _email, _password, _datepicker, _luongCB, _chucvu, _gioLam ){
        this.tknv = _tknv
        this.name = _name
        this.email = _email
        this.password = _password
        this.datepicker = _datepicker
        this.luongCB =_luongCB
        this.chucvu = _chucvu
        this.gioLam = _gioLam
    }
    tinhLuong(){
        if(this.chucvu === 'giamDoc') return( Number(this.luongCB) * 3).toLocaleString()
        if(this.chucvu === "truongPhong") return( Number(this.luongCB) *2).toLocaleString()
        if(this.chucvu === 'nhanVien') return( Number(this.luongCB) *1).toLocaleString()
        return 'Vui lòng chọn chức vụ'
    }
    xepLoai(){
        if(Number(this.gioLam) >= 192) return 'Nhân viên xuất sắc'
        if(Number(this.gioLam) >= 172) return 'Nhân viên giỏi'
        if(Number(this.gioLam) >= 160) return 'Nhân viên khá'
        return  'Nhân viên trung bình'      
    }
    mappingChucVu(){
      if(this.chucvu === 'giamDoc') return "Giám đốc"
      if(this.chucvu === 'truongPhong') return "Trưởng phòng"
      if(this.chucvu === 'nhanVien') return "Nhân viên"
      return 'Vui lòng chọn chức vụ'
    }

}

 
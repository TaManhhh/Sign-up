import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "welcome": "Hello!!",
      "email": "Email Address",
      "password": "Password",
      "repeatPassword": "Reconfirm password",
      "name": "Full name",
      "gender": "Gender",
      "region": "Region",
      "state": "State",
      "rememberMe": "Remember me",
      "emailRequire": "Please enter your email address",
      "emailInvalid": "Invalid email address",
      "passwordRequire": "Please enter your password",
      "matchPasswordInvalid": "Confirm password mismatch",
      "minPasswordInvalid": "Password of at least 4 characters",
      "nameRequire": "Full name must not be blank",
      "genderRequire": "Gender must not be blank",
      "regionRequire": "Region cannot be left blank",
      "stateRequire": "State cannot be left blank",
      "login": "Login",
      'register': "Register",
    },
  },
  vi: {
    translation: {
        "welcome": "Xin chào",
        "email": "Địa chỉ Email",
        "password": "Mật khẩu",
        "repeatPassword": "Xác nhận lại mật khẩu",
        "name": "Họ và tên",
        "gender": "Giới tính",
        "region": "Quốc gia",
        "state": "Tiểu bang",
        "rememberMe": "Lưu thông tin đăng nhập",
        "emailRequire": "Vui lòng nhập địa chỉ email",
        "emailInvalid": "Địa chỉ email không hợp lệ",
        "passwordRequire": "Vui lòng nhập mật khẩu",
        "matchPasswordInvalid": "Xác nhận mật khẩu không khớp",
        "minPasswordInvalid": "Mật khẩu tối thiểu 4 ký tự",
        "nameRequire": "Họ và tên không được để trống",
        "genderRequire": "Giới tính không được để trống",
        "regionRequire": "Quốc gia không được để trống",
        "stateRequire": "Thành phố không được để trống",
        "login": "Đăng nhập",
        "register": "Đăng ký ngay"
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;

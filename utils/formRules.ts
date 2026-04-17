import type { FormRules } from "element-plus";
import { useLang } from "@/composables/useLang";

// const { t } = useLang();

/**-----------------------------------特殊校驗方法------------------------------ */

// 身分證校驗
const codeMap: Record<string, number> = {
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15,
  G: 16,
  H: 17,
  I: 34,
  J: 18,
  K: 19,
  L: 20,
  M: 21,
  N: 22,
  O: 35,
  P: 23,
  Q: 24,
  R: 25,
  S: 26,
  T: 27,
  U: 28,
  V: 29,
  W: 32,
  X: 30,
  Y: 31,
  Z: 33,
};

const checkIdCard = (country: string) => {
  return (rule: any, value: string, callback: any) => {
    if (!value) callback(new Error("請輸入身分證字號"));
    if (value && country === 'Taiwan') {

      if (!/^[A-Z][0-9]{9}$/.test(value)) {
        callback({ valid: false, message: "身份證格式不正確" });
      }

      const placeCode = codeMap[value[0]];
      if (!placeCode) {
        callback({ valid: false, message: "首碼無效" });
      }

      const bodyCode = value.substring(1, 9);
      const lastCode = value[9];
      const calHead = (num: number): number =>
        Math.floor(num / 10) * 1 + (num % 10) * 9;
      const calBody = (code: string): number => {
        let sum = 0;
        for (let i = 0; i < code.length; i++) {
          sum += parseInt(code[i]) * (8 - i);
        }
        return sum;
      };
      const idSum =
        calHead(placeCode) + calBody(bodyCode) + parseInt(lastCode) * 1;
      const isValid = idSum % 10 === 0;
      if (!isValid) {
        callback({ valid: false, message: "身分證號不合法" });
      } else {
        callback();
      }
    }
  };
}

const validateAge = (rule: any, value: any, callback: any) => {
  if (value) {
    const now = new Date();
    const birthday = new Date(value);
    const age = now.getFullYear() - birthday.getFullYear();
    if (age > 45) {
      callback(new Error('Age must be less than 45'));
    } else {
      callback();
    }
  } else {
    callback(new Error('Please input your birthday'));
  }
}



const validateRemitAccount = (t: any) => {
  return (rule: any, value: string, callback: any) => {
    if (!value) {
      callback(new Error(t.value.remitAccountLast5Validate))
    } else if (value.length !== 5) {
      callback(new Error(t.value.remitAccountLast5Validate2))
    } else if (!/^\d{5}$/.test(value)) {
      callback(new Error(t.value.remitAccountLast5Validate2))
    }
    else {
      callback()
    }
  }
}


const validateConfirmPassword = (t: any) => {
  return (password: string) => {
    return (rule: any, value: string, callback: any) => {
      if (!value) {
        callback(new Error(t.value.confirmPasswordValidate))
      } else if (value !== password) {
        callback(new Error(t.value.confirmPasswordValidate2))
      } else {
        callback()
      }
    }
  }
}

const vaildConfirmEmail = (email: string, t: any) => {
  return (rule: any, value: string, callback: any) => {
    if (!value) {
      callback(new Error(t.value.confirmEmailValidate))
    } else if (value !== email) {
      callback(new Error(t.value.confirmEmailValidate))
    } else {
      callback()
    }
  }
}
/**-----------------------------------中文校驗------------------------------ */
export const formRulesTW = reactive<FormRules>({
  title: [{ required: true, message: "請選擇稱謂", trigger: "blur" }],
  chineseName: [{ required: true, message: "請輸入中文名", trigger: "blur" }],
  firstName: [{ required: true, message: "請輸入英文名", trigger: "blur" }],
  lastName: [{ required: true, message: "請輸入英文姓", trigger: "blur" }],
  email: [
    { required: true, message: "請輸入電子郵件", trigger: "blur" },
    { type: "email", message: "請輸入正確的電子郵件格式", trigger: "blur" },
  ],
  affiliation: [{ required: true, message: "請輸入所屬機構", trigger: "blur" }],
  jobTitle: [{ required: true, message: "請輸入職稱", trigger: "blur" }],
  countryCode: [{ required: true, message: "請輸入國家代碼", trigger: "blur" }],
  country: [{ required: true, message: "請輸入國家", trigger: "blur" }],
  phone: [{ required: true, message: "請輸入電話號碼", trigger: "blur" }],
  // idCard: [{ required: true, validator: checkIdCard, trigger: "blur" }],
  // category: [{ required: true, message: "請選擇類別", trigger: "blur" }],
});

/**-----------------------------------英文校驗------------------------------ */
export const formRulesEN = reactive<FormRules>({
  firstName: [
    { required: true, message: "Please input firsrName", trigger: "blur" },
  ],
  lastName: [
    { required: true, message: "Please input lastName", trigger: "blur" },
  ],
  email: [
    { required: true, message: "Please input email", trigger: "blur" },
    { type: "email", message: "Please input correct email", trigger: "blur" },
  ],
  password: [
    { required: true, message: "Please input password", trigger: "blur" },
  ],
  affiliation: [
    { required: true, message: "Please input affiliation", trigger: "blur" },
  ],
  jobTitle: [
    { required: true, message: "Please input jobTitle", trigger: "blur" },
  ],
  countryCode: [
    { required: true, message: "Please input country code", trigger: "blur" },
  ],
  country: [
    { required: true, message: "Please select country", trigger: "blur" },
  ],
  phone: [
    { required: true, message: "Please input phone number", trigger: "blur" },
  ],
  idCard: [
    { required: true, message: "Please input passport code", trigger: "blur" },
  ],
  absType: [{ required: true, message: 'Please select type', trigger: 'blur' }],
  absTitle: [{ required: true, message: 'Please input title', trigger: 'blur' }],
  firstAuthor: [{ required: true, message: 'Please input first author', trigger: 'blur' }],
  firstAuthorBirthday: [{ required: true, validator: validateAge, trigger: 'blur' }],
  speaker: [{ required: true, message: 'Please input speaker', trigger: 'blur' }],
  speakerAffiliation: [{ required: true, message: 'Please input speaker affiliation', trigger: 'blur' }],
  correspondingAuthor: [{ required: false, message: 'Please input corresponding author', trigger: 'blur' }],
  correspondingAuthorEmail: [{ required: false, message: 'Please input corresponding author email', trigger: 'blur' }],
  correspondingAuthorPhone: [{ required: false, message: 'Please input corresponding author phone', trigger: 'blur' }],
  allAuthor: [{ required: false, message: 'Please input all authors', trigger: 'blur' }],
  allAuthorAffiliation: [{ required: false, message: 'Please input all authors affiliation', trigger: 'blur' }],
  fileList: [{ required: true, message: 'Please upload file', trigger: 'change' }],
});

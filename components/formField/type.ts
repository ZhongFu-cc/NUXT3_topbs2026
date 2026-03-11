export enum FieldType {
  TEXT = "text",
  TEXTAREA = "textarea",
  NUMBER = "number",
  EMAIL = "email",
  SELECT = "select",
  RADIO = "radio",
  RATE = "rate",
  CHECKBOX = "checkbox",
  DATE = "date",
  SECTION = "section",
  IMAGE = "image",
}


export interface FormDto {
  formId: string
  title: string
  description: string
  status: string
  requireLogin: number
  requiredForCheckout: number
  allowMultipleSubmissions: number
  startTime: string
  endTime: string
  formFields: FormField[]
}

export interface FormField {
  formFieldId: string
  formId: string
  fieldType: FieldType
  label: string
  description: string | null
  placeholder: string | null
  imageUrl: string | null
  imageCaption: string | null
  isRequired: number
  fieldOrder: number
  options: FieldOptions | null
  validationRules: ValidationRules | null
  answer: any
}

export interface FieldOptions {
  choices: Choice[]
  allowCustom: boolean
}

export interface Choice {
  id: string
  label: string
  imgUrl: string
}

export interface ValidationRules {
  max?: number
  min?: number
  showIf?: any
}
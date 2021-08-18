type IFormType = 'input' | 'password' | 'select' | 'datepocker'
export interface IFormItem {
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
}

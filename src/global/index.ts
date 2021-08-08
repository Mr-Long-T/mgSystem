import { App } from 'vue'
import registerElement from './register-element'

//app 类型为App
export function registerApp(app: App): void {
  registerElement(app)
}

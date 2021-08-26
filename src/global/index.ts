import { App } from 'vue'
import registerElement from './register-element'
import registerProperties from './register-properties'

//app 类型为App
export function registerApp(app: App): void {
  // registerElement(app)
  app.use(registerElement)
  app.use(registerProperties)
}

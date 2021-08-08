export const rules = {
  //编写规则    {属性1：[规则1，规则2]}
  name: [
    {
      //必传
      required: true,
      //不符合显示内容
      message: '请输入账号！',
      //触发规则
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{6,18}$/,
      message: '用户名必须是6~18个字符或数字！',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码！',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{6,18}$/,
      message: '密码必须是6~18个字符或数字！',
      trigger: 'blur'
    }
  ]
}

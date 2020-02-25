import { Constant, randomAvatar, qs } from './_utils'

const { ApiPrefix } = Constant

const EnumRoleType = {
  ADMIN: 'admin',
  DEFAULT: 'guest',
  DEVELOPER: 'developer'
}

const userPermission = {
  DEFAULT: {
    visit: ['1', '2', '21', '7', '5', '51', '52', '53'],
    role: EnumRoleType.DEFAULT
  },
  ADMIN: {
    role: EnumRoleType.ADMIN
  },
  DEVELOPER: {
    role: EnumRoleType.DEVELOPER
  }
}

const adminUsers = [
  {
    id: 0,
    username: 'admin',
    password: 'admin',
    permissions: userPermission.ADMIN,
    avatar: randomAvatar()
  },
  {
    id: 1,
    username: 'guest',
    password: 'guest',
    permissions: userPermission.DEFAULT,
    avatar: randomAvatar()
  },
  {
    id: 2,
    username: '李常超',
    password: '15442',
    permissions: userPermission.DEFAULT,
    avatar: randomAvatar()
  },
]

module.exports = {
  [`POST ${ApiPrefix}/user/login`](req, res) {
    const { username, password } = req.body
    const user = adminUsers.filter(item => item.username === username)
    if (user.length > 0 && user[0].password === password) {
      const now = new Date()
      now.setDate(now.getDate() + 1)
      res.cookie('token', JSON.stringify({ id: user[0].id, deadline: now.getTime() }),
        {
          maxAge: 900000,
          httpOnly: true
        })
      res.json({ success: true, message: 'Ok' })
    } else {
      res.status(400).end()
    }
  },
  [`GET ${ApiPrefix}/user`](req, res) {
    const cookie = req.headers.cookie || ''
    // 以;为分隔符解析cookie为对象
    const cookies = qs.parse(cookie.replace(/\s/g, ''), { delimiter: ';' })
    const response = {}
    let user = {}

    // 登录时设置过cookie，用cookie判断是否登录过
    // 未登录
    if (!cookies.token) {
      res.status(200).send({ message: 'Not Login' })
      return
    }
    // 已登录：cookie有效才返回用户的信息
    const token = JSON.parse(cookies.token)
    if (token) {
      // 返回成功状态靠cookie是否失效决定（登录时设置cookie的生命周期为1天）
      response.success = token.deadline > new Date().getTime()
    }
    if (response.success) {
      const userItem = adminUsers.find(_ => _.id === token.id)
      if (userItem) {
        const { password, ...other } = userItem
        user = other
      }
    }
    response.user = user
    res.json(response)
  },

  [`GET ${ApiPrefix}/user/logout`](req, res) {
    res.clearCookie('token')
    res.status(200).end()
  }
}

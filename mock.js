module.exports = function mock(app) {
  app.get('/some/path', (req, res) => {
    res.json({data: '123123'})
  })

  // ...其他请求的mock
  // 如果mock过多，可以将其拆分成多个代码文件，然后require进来
}
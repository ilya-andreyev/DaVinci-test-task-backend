const allSprints = require('./allSprints')
const allIssues = require('./allIssues')
const velocity = require('./velocity')
const leadTime = require('./leadTime')
const stabilizationRatio = require('./stabilizationRatio')
const productivity = require('./productivity')

const router = (app) => {
  app.get('/api/allSprints', allSprints)

  app.get('/api/allIssues', allIssues)

  app.get('/api/statistic/velocity/allSprints', velocity.allSprints)

  app.get('/api/statistic/leadTime/allIssues', leadTime.allIssues)

  app.get('/api/statistic/velocity/sprint', velocity.oneSprint)

  app.get('/api/statistic/leadTime/issue', leadTime.oneIssue)

  app.get('/api/statistic/stabilizationRatio/issue', stabilizationRatio.oneIssue)

  app.get('/api/statistic/productivity/issue', productivity.oneIssue)
}

module.exports = router

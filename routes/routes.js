const allSprints = require('./allSprints')
const allIssues = require('./allIssues')
const velocity = require('./velocity')
const leadTime = require('./leadTime')
const developmentLeadTime = require('./developmentLeadTime')
const testingLeadTime = require('./testingLeadTime')
const stabilizationRatio = require('./stabilizationRatio')
const developmentDividedByPoints = require('./developmentDividedByPoints')

const router = (app) => {
  app.get('/api/allSprints', allSprints)

  app.get('/api/allIssues', allIssues)

  app.get('/api/statistic/velocity/allSprints', velocity.allSprints)

  app.get('/api/statistic/velocity/sprint', velocity.oneSprint)

  app.get('/api/statistic/leadTime/allIssues', leadTime.allIssues)

  app.get('/api/statistic/leadTime/issue', leadTime.oneIssue)

  app.get('/api/statistic/developmentLeadTime/allIssues', developmentLeadTime.allIssues)

  app.get('/api/statistic/developmentLeadTime/issue', developmentLeadTime.oneIssue)

  app.get('/api/statistic/testingLeadTime/allIssues', testingLeadTime.allIssues)

  app.get('/api/statistic/testingLeadTime/issue', testingLeadTime.oneIssue)

  app.get('/api/statistic/stabilizationRatio/issue', stabilizationRatio.oneIssue)

  app.get('/api/statistic/developmentDividedByPoints/issue', developmentDividedByPoints.oneIssue)
}

module.exports = router

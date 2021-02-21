const http = require('./index')

const allSprints = () => http.get('/projects/608/versions.json', {
  params: {
    key: process.env.API_ACCESS_KEY,
  },
})

const allIssues = () => http.get('/issues.json', {
  params: {
    key: process.env.API_ACCESS_KEY,
    project_id: '608',
    tracker_id: '30',
    status_id: 'closed',
    limit: '100',
  },
})

const issueById = (id) => http.get(`/issues/${id}.json`, {
  params: {
    key: process.env.API_ACCESS_KEY,
    include: 'journals',
  },
})

const issueRelations = (id) => http.get(`/issues/${id}/relations.json`, {
  params: {
    key: process.env.API_ACCESS_KEY,
  },
})

const issueByIdWithoutJournals = (id) => http.get(`/issues/${id}.json`, {
  params: {
    key: process.env.API_ACCESS_KEY,
  },
})

exports.allSprints = allSprints
exports.allIssues = allIssues
exports.issueById = issueById
exports.issueRelations = issueRelations
exports.issueByIdWithoutJournals = issueByIdWithoutJournals

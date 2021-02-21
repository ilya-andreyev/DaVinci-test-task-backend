const getDataFromRedmineAPI = require('../http/getDataFromRedmineAPI')

const oneIssue = async ({ query: { id } }, res) => {
  const { data: { issue } } = await getDataFromRedmineAPI.issueByIdWithoutJournals(id)
  if (issue.status.id !== 5) {
    const data = {
      message: 'The task does not have a closed status.',
    }
    res.send(data)
  } else {
    const { data: { relations } } = await getDataFromRedmineAPI.issueRelations(id)
    const relatedIssuesId = relations.map(({ issue_to_id: issueToId }) => issueToId)
    const issues = await Promise.all(relatedIssuesId.map(async (relatedIssueId) => {
      const { data } = await getDataFromRedmineAPI.issueByIdWithoutJournals(relatedIssueId)
      return data.issue
    }))
    const defectsHours = issues
      .filter(({ tracker: { id: taskId } }) => taskId === 29)
      .map(({ spent_hours: spentHours }) => spentHours)
      .reduce((acc, val) => acc + val)

    const data = {
      id,
      stabilizationRatio: defectsHours / issue.spent_hours,
    }
    res.send(data)
  }
}

exports.oneIssue = oneIssue

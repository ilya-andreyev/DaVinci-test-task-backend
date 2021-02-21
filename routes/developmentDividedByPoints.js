const getDataFromRedmineAPI = require('../http/getDataFromRedmineAPI')

const oneIssue = async ({ query: { id } }, res) => {
  const { data: { issue } } = await getDataFromRedmineAPI.issueByIdWithoutJournals(id)
  if (issue.status.id !== 5) {
    const data = {
      message: 'The task does not have a closed status.',
    }
    res.send(data)
  } else {
    const { spent_hours: spentHours } = issue
    const storyPoints = issue.custom_fields[0].value
    const data = {
      id,
      developmentDividedByPoints: spentHours / storyPoints,
    }
    res.send(data)
  }
}

exports.oneIssue = oneIssue

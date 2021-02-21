const getDataFromRedmineAPI = require('../http/getDataFromRedmineAPI')

module.exports = async (req, res) => {
  const { data: { issues } } = await getDataFromRedmineAPI.allIssues()
  const data = issues.map(({
    id,
    project: { name: projectName },
    tracker: { name: trackerName },
    status: { name: statusName },
    priority: { name: priorityName },
    author: { name: authorName },
    fixed_version: { name: targetVersionName },
    subject,
    custom_fields: [{ value: storyPoint }],
    created_on: createdOn,
  }) => ({
    id,
    projectName,
    trackerName,
    statusName,
    priorityName,
    authorName,
    targetVersionName,
    subject,
    storyPoint,
    createdOn,
  }))
  res.send(data)
}

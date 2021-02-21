const getDataFromRedmineAPI = require('../http/getDataFromRedmineAPI')

module.exports = async (req, res) => {
  const { data: { versions } } = await getDataFromRedmineAPI.allSprints()
  const data = versions.map(({
    id, name, created_on: createdOn, project: { name: projectName }, status,
  }) => ({
    id,
    name,
    createdOn,
    projectName,
    status,
  }))
  res.send(data)
}

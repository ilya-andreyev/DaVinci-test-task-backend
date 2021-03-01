const getDataFromRedmineAPI = require('../http/getDataFromRedmineAPI')

const allSprints = async (req, res) => {
  const { data: { issues } } = await getDataFromRedmineAPI.allIssues()
  const arrOfSprintsId = [
    ...new Set(issues.map(({ fixed_version: fixedVersion }) => fixedVersion.id)),
  ]
  const arrOfSprintsVelocity = arrOfSprintsId.map((id) => ({
    [id]: issues
      .filter(({ fixed_version: fixedVersion }) => fixedVersion.id === id)
      .map(({ custom_fields: customFields }) => Number(customFields[0].value))
      .reduce((acc, val) => acc + val),
  }))
  const data = arrOfSprintsVelocity.map((sprintVelocity) => {
    const sprintName = issues
      .find((issue) => issue.fixed_version.id === Number(Object.keys(sprintVelocity)[0]))
      .fixed_version
      .name
    return {
      id: Object.keys(sprintVelocity)[0],
      velocity: Object.values(sprintVelocity)[0],
      sprintName,
    }
  })
  res.send(data)
}

const oneSprint = async ({ query: { id } }, res) => {
  const { data: { issues } } = await getDataFromRedmineAPI.allIssues()
  const sprintIssues = issues
    .filter(({ fixed_version: fixedVersion }) => fixedVersion.id === Number(id))
  if (sprintIssues.length === 0) {
    const data = {
      message: 'Sprint has no closed tasks.',
    }
    res.send(data)
  } else {
    const velocity = sprintIssues
      .map(({ custom_fields: customFields }) => Number(customFields[0].value))
      .reduce((acc, val) => acc + val)
    const data = {
      id,
      velocity,
    }
    res.send(data)
  }
}

exports.allSprints = allSprints
exports.oneSprint = oneSprint

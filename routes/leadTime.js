const differenceInDays = require('date-fns/differenceInDays')
const parseISO = require('date-fns/parseISO')

const getDataFromRedmineAPI = require('../http/getDataFromRedmineAPI')

const allIssues = async (req, res) => {
  const { data: { issues } } = await getDataFromRedmineAPI.allIssues()
  const arrOfTasksId = issues.map(({ id }) => id)
  const data = await Promise.all(arrOfTasksId.map(async (id) => {
    const { data: { issue } } = await getDataFromRedmineAPI.issueById(id)
    const inProgressJournal = issue.journals.find((journal) => journal.details[0]?.new_value === '2' || journal.details[1]?.new_value === '2')
    const closedJournal = issue.journals.find((journal) => journal.details[0]?.new_value === '5' || journal.details[1]?.new_value === '5')
    return {
      id,
      leadTime: differenceInDays(
        parseISO(closedJournal.created_on),
        parseISO(inProgressJournal.created_on),
      ),
    }
  }))
  res.send(data)
}

const oneIssue = async ({ query: { id } }, res) => {
  const { data: { issue } } = await getDataFromRedmineAPI.issueById(id)
  if (issue.status.id !== 5) {
    const data = {
      message: 'The task does not have a closed status.',
    }
    res.send(data)
  } else {
    const inProgressJournal = issue.journals.find((journal) => journal.details[0]?.new_value === '2' || journal.details[1]?.new_value === '2')
    const closedJournal = issue.journals.find((journal) => journal.details[0]?.new_value === '5' || journal.details[1]?.new_value === '5')
    const data = {
      id,
      leadTime: differenceInDays(
        parseISO(closedJournal.created_on),
        parseISO(inProgressJournal.created_on),
      ),
    }
    res.send(data)
  }
}

exports.allIssues = allIssues
exports.oneIssue = oneIssue

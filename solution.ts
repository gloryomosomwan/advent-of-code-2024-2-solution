import { readFile } from 'node:fs'

readFile('./input.txt', (err, data) => {
  if (err) throw err;
  let reports: string = data.toString()
  let reportsArray: Array<string> = reports.split('\n')
  let numOfSafeReports = 0
  for (const line of reportsArray) {
    let reportArr = line.split(' ')
    let newArr: Array<number> = [];
    for (const s in reportArr) {
      newArr.push(Number(s))
    }
    if (checkSafety(newArr) === true) {
      numOfSafeReports += 1
    }
  }
  console.log(numOfSafeReports)
});

function checkSafety(report: Array<number>): boolean {
  let order: undefined | string = undefined

  let isSafe: boolean = true

  for (let i = 0; i < report.length; i++) {
    // On first iteration check the direction
    if (i === 0) {
      if (report[0] > report[1]) {
        order = 'desc'
      }
      else if (report[0] < report[1]) {
        order = 'asc'
      }
      else {
        isSafe = false
      }
    }
    else {
      if (order === 'asc' && report[i] >= report[i + 1] || order === 'desc' && report[i] <= report[i + 1]) {
        isSafe = false
      }
    }

    const difference = Math.abs(report[i] - report[i + 1])

    if (difference < 1 || difference > 3) {
      isSafe = false
    }
  }
  return isSafe
}

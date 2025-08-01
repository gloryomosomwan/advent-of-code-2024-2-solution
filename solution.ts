import * as readline from 'node:readline';
import { createReadStream } from 'node:fs';

async function calculateSafeReports() {
  const stream = createReadStream('./input.txt');

  const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
  });

  let numOfSafeReports = 0

  for await (const line of rl) {
    let rawReport = line.split(' ')
    let report: Array<number> = []
    for (const level of rawReport) {
      report.push(Number(level))
    }
    if (checkSafety(report)) numOfSafeReports += 1
  }

  console.log(`There are ${numOfSafeReports} safe reports.`)
}

calculateSafeReports()

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
        return isSafe
      }
    }
    else {
      if (order === 'asc' && report[i] >= report[i + 1] || order === 'desc' && report[i] <= report[i + 1]) {
        isSafe = false
        return isSafe
      }
    }

    const difference = Math.abs(report[i] - report[i + 1])

    if (difference < 1 || difference > 3) {
      isSafe = false
      return isSafe
    }
  }
  return isSafe
}

const es = require('event-stream');
const fs = require('fs');
const Rx = require('rxjs');
const isAnagram = require('./anagram')
const processingStatus$ = new Rx.Subject();
var groupedList = null;
const chunk = (arr, size) => arr.reduce((acc, e, i) => (i % size ? acc[acc.length - 1].push(e) : acc.push([e]), acc), []);

function main() {
    
    let arguments  =  process.argv.slice(2); 
    let linesRead = 0;
    
    processingStatus$.next('Started processing files');

    fs.createReadStream(arguments[0]).pipe(es.split()).pipe(es.mapSync(async (line) => {
        linesRead++;
        if (linesRead % 10000 === 0) {
            processingStatus$.next('Processed ' + linesRead + ' lines');
        }
        if (!groupedList) {
            groupedList = {};
            groupedList[line] = [line];
        } else {
            let filteredList = Object.keys(groupedList).filter(f => f.length === line.length);
            let chunkList = chunk(filteredList, 1000);
            let promiseList = chunkList.map(chunk => lineMatched(chunk, line)); 
            await Promise.all(promiseList).then(values => { 
                if (values.indexOf('true')==-1) {
                    groupedList[line] = [line];
                }
            }).catch(err => {
                console.log(err + '[' + line + ']');
            });
        }
    })).on('error', (err) => {
        console.log(err);
    }).on('end', () => {
        console.log(Object.values(groupedList).map(m => m.join(',')).join('\n'))
        processingStatus$.next('Completed processing files' + 'Processed ' + linesRead + 'lines');
    });
}

async function lineMatched(filteredList, line) {
    return new Promise((resolve) => {
        for (let groupKey of filteredList) {
            if (isAnagram(groupKey, line)) {
                groupedList[groupKey] = [...groupedList[groupKey], line];
                resolve('true');
            }
        }
        resolve('false');
    }) ;
}
 
main();
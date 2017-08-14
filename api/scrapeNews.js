const cheerio = require('cheerio');
const request = require('request');

const newsList = require('./newspaper_list').data;
// const newsList = [{
//         name: "Memphis daily appeal.",
//         id: "sn83045160"
//     },
//     {
//         name: "Arizona republican.",
//         id: "sn84020558"
//     },
//     {
//         name: "Bisbee daily review.",
//         id: "sn84024827"
//     }]

function checkEndOfScrape(resolve, reject, data, ajaxRemaining) {
    if (ajaxRemaining === 0) {
        console.log('resolving data');
        if (data.length !== 0) resolve(data);
        reject('REJECT-EMPTY: no matches found for newspaper ID');
    }
}

function scrapeNews(year, month, day) {
    
    let ajaxRemaining = newsList.length;
    
    return new Promise((resolve, reject) => {
        const data = [];
        console.log(`begin scrape for ${year}-${month}-${day}`);
        
        try {
            newsList.forEach((paper, i) => {
                setTimeout(() => {
                    const url = `http://chroniclingamerica.loc.gov/lccn/${paper.id}/${year}-${month}-${day}/ed-1/seq-1/ocr/`;
                    request(url, (err, response, html) => {
                        try {
                            console.log(`begin scrape: ${paper.name} - ${ajaxRemaining} remaining`);
                            if (err) {
                                ajaxRemaining--;
                                console.log(err);
                            }
                            const $ = cheerio.load(html);
                            
                            if ($('div#main').length ||
                                $('body').text().search(/Requested resource could not be found/g) > -1) {
                                console.log(`did not scrape from ${paper.name}, does not exist`);
                                ajaxRemaining--;
                                checkEndOfScrape(resolve, reject, data, ajaxRemaining);
                                return;
                            }
                            
                            const head = $('#head_nav h1')[1].children[0].data;
                            const body = $('div p')[0].children.filter((child, i) => i % 2 == 0).reduce((total, n) => total + '\n' + n.data, '');
                            
                            data.push({
                                uniqueID: `${year}-${month}-${day}-${paper.id}`,
                                dateString: `${year}-${month}-${day}`,
                                newspaperName: head.split('.')[0],
                                location: head.substring(head.indexOf('(') + 1, head.indexOf(')')),
                                year, month, day, url,
                                contents: body.replace('[object Object]', ''),
                            });
                            
                            console.log(`scraped data from ${paper.name}`);
                            ajaxRemaining--;
                            
                            checkEndOfScrape(resolve, reject, data, ajaxRemaining);
                        } catch (e) {
                            reject('crash');
                        }
                    });
                }, 250 * i);
                
            });
        } catch (err) {
            console.log('ERROR\n' + err);
            reject("Error in scraping!");
        }
        
    });
}

module.exports = { scrapeNews };
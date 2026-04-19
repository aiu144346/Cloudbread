const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const urls = [
    "https://www.usjournal.kr/news/newsview.php?ncode=179513676709502",
    "https://www.usjournal.kr/news/newsview.php?ncode=1065564671845236",
    "https://www.usjournal.kr/news/newsview.php?ncode=1065580712197790",
    "https://www.usjournal.kr/news/newsview.php?ncode=1065602165191363",
    "https://www.usjournal.kr/news/newsview.php?ncode=1065622970111027",
    "https://www.usjournal.kr/news/newsview.php?ncode=1065618893520262",
    "https://www.usjournal.kr/news/newsview.php?ncode=1065622091260292",
    "https://www.usjournal.kr/news/newsview.php?ncode=1065601120341534",
    "https://www.usjournal.kr/news/newsview.php?ncode=1065615007506281",
    "https://hopeulsan.mixon.io/posts/70texwd",
    "http://hopeulsan.net/bbs/board.php?bo_table=review&wr_id=176",
    "https://m.usjournal.kr/news/newsview.php?ncode=1065621242060554",
    "https://m.usjournal.kr/news/newsview.php?ncode=1065564631079595",
    "https://m.usjournal.kr/news/newsview.php?ncode=1065577386551553",
    "https://m.usjournal.kr/news/newsview.php?ncode=1065603006805190",
    "https://m.usjournal.kr/news/newsview.php?ncode=1065623149212961",
    "https://m.usjournal.kr/news/newsview.php?ncode=1065560161747557",
    "https://m.usjournal.kr/news/newsview.php?ncode=1065563504670568",
    "https://m.usjournal.kr/news/newsview.php?ncode=1065568431676459",
    "https://m.usjournal.kr/news/newsview.php?ncode=1065615800270246",
    "https://m.usjournal.kr/news/newsview.php?ncode=1065571113068780",
    "https://m.usjournal.kr/news/newsview.php?ncode=1065596740741040",
    "https://m.usjournal.kr/news/newsview.php?ncode=1065606991926285",
    "https://www.knowhow.or.kr/region/region_news_detail.php?pri_no=999435511",
    "https://blog.naver.com/06rnftkrrl/224198183186",
    "https://www.ksilbo.co.kr/news/articleView.html?idxno=791395",
    "https://www.chungnamilbo.co.kr/news/articleView.html?idxno=770543",
    "https://www.eniedu.co.kr/course_view?id=79",
    "https://www.nebeca.co.kr/course/view.asp?LecCD=260004&submenu=3",
    "https://www.kpinews.kr/newsView/1065588989607541"
];

async function fetchTitles() {
    const results = [];
    console.log(`Starting to fetch ${urls.length} titles...`);
    
    for (const url of urls) {
        try {
            console.log(`Fetching: ${url}`);
            const response = await axios.get(url, { 
                timeout: 5000,
                headers: { 'User-Agent': 'Mozilla/5.0' }
            });
            const $ = cheerio.load(response.data);
            
            // Try common title selectors
            let title = $('meta[property="og:title"]').attr('content') || 
                        $('title').text().trim() || 
                        $('h1').first().text().trim() || 
                        '제목 없음';
            
            // Extract OG Image
            let ogImage = $('meta[property="og:image"]').attr('content') || '';
            
            // Clean up some common prefixes
            title = title.split(' - ')[0].split(' : ')[0].trim();
            
            const source = new URL(url).hostname.replace('www.', '').replace('m.', '');
            
            results.push({ url, title, source, ogImage });
            console.log(`✅ ${title} (Image: ${ogImage ? 'Yes' : 'No'})`);
        } catch (error) {
            console.log(`❌ Error fetching ${url}: ${error.message}`);
            results.push({ url, title: "기사 원문 보기", source: new URL(url).hostname, ogImage: '' });
        }
        // Small delay to be polite
        await new Promise(r => setTimeout(r, 500));
    }
    
    fs.writeFileSync('media_titles.json', JSON.stringify(results, null, 2));
    console.log('Done! Results saved to media_titles.json');
}

fetchTitles();

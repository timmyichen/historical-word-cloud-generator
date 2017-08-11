import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Popup } from 'semantic-ui-react';

const Theme = require('syntux/style/atelier-sulphurpool.light');
const Html = require('syntux/xml');

const sampleHtml = [
{
    html: `<div id="head_nav">
    <h1>OCR Interpretation</h1>
    <br>`,
    hoverText: '',
},
{
    html: `<h1>The Washington herald. (Washington, D.C.) 1906-1939, May 06, 1917, Image 1</h1>`,
    hoverText: `This is where we would extract the paper name and location
        (2nd h1 on the page)`,
},
{
    html: `<h3>Image and text provided by Library of Congress, Washington, DC</h3>`,
    hoverText: '',
},
{
    html: `<h3>Persistent link: <a href="/lccn/sn83045433/1917-05-06/ed-1/seq-1/">http://chroniclingamerica.loc.gov/lccn/sn83045433/1917-05-06/ed-1/seq-1/</a></h3>`,
    hoverText: `If we needed to get the link, we could get it here, but we already have
        the ID and the date, and we can construct the URL from just that information alone.
        However, if we really needed to scrape it, we could describe the link as "the
        href attribute within the a tag within the 2nd h3 tag on the page"`,
},
{
    html: `</div>
<h2><a href="/ocr/">What is OCR?</a></h2>

<div class="thumbnail">
    <br />
<a href="">
    <img src="/lccn/sn83045433/1917-05-06/ed-1/seq-1/thumbnail.jpg" alt="Thumbnail for ">
</a>
<br />
</div>`,
    hoverText: '',
},
{
    html: `<div>
    <p>
        jJt..
        <br />N o wl .~r n A l t.e a<br />
        NO. S88. VUTUW FAkhUIr CLoUDY WASHINGTON, D. C.. SUNDAY. MAY 6, 1917. TWO C 22M
        <br />E MENACE
        <br />IVENTION
        <br />ON BOARD
        <br />To Meet Missions
        <br />(f Iateegathet News Serviee)
        <br />New York, May .-The an
        <br />noufcement of W. L. Saunders
        <br />that the Naval Advisory Board.
        <br />of which be is chairman. has
        <br />solved the U-boat problem ex
        <br />plains the thoroughly characteris
        <br />tic enigmatic telegrams from
        <br />Thomas A. Edison to Washington
        <br />when he was invited to attend the...
    </p>
</div>`,
    hoverText: `This is a shortened version of the full article.  This is where we would
        actually get all our words from.  We describe this location as the paragraph (p)
        tag within a div tag (this doesn't happen anywhere else on the page!)`
}
];

class ScrapingTab extends Component {
    generateStaticHTML() {
        return sampleHtml.map((section, i) => {
            return (
                section.hoverText === '' ?
                <span key={`section${i}`}><Html>{section.html}</Html></span>
                :
                <Popup
                    key={`section${i}`}
                    trigger={<span className="can-hover"><Html>{section.html}</Html></span>}
                    content={section.hoverText}
                />
            )
        });
    }
    render() {
        return (
            <div id="tab-scrape">
                <div id="tab-scrape-heading">
                    <Header as="h2">Web Scraping</Header>
                    <p>
                        This site does not hold a database that holds news from every possible date
                        between 1836 and 1924.  It "scrapes" the data from a website - which means
                        it accesses the website and autonomously extracts the data from the website
                        without any human action.
                    </p>
                </div>
                <div id="scrape-links">
                    <div className="left text">
                        <Header as="h3">Knowing Where to Scrape</Header>
                        <p>
                            The first question might be, how do we know where to find the data?  Let's
                            examine a sample URL from the Library of Congress:
                            <li><a href="http://chroniclingamerica.loc.gov/lccn/sn83045433/1917-05-06/ed-1/seq-1/ocr/" target="_blank">
                            http://chroniclingamerica.loc.gov/lccn/sn83045433/1917-05-06/ed-1/seq-1/ocr/</a></li>
                            (this "OCR" link is accessible from the
                            <a href="http://chroniclingamerica.loc.gov/lccn/sn83045433/1917-05-06/ed-1/seq-1/" target="_blank">
                            main page</a> of the newspaper itself)  Now let's look at another link for a different
                            date and a different paper:
                            <li><a href="http://chroniclingamerica.loc.gov/lccn/sn83045462/1865-04-15/ed-1/seq-1/ocr/" target="_blank">
                            http://chroniclingamerica.loc.gov/lccn/sn83045462/1865-04-15/ed-1/seq-1/ocr/</a></li>
                            We see a few differences and a lot of similarities.
                        </p>
                        <p>
                            First off, we notice that the only parts that are different are the dates in the format
                            "YYYY-MM-DD" and the part right before, which starts with "sn" followed by a bunch of numbers.
                            We can take a guess and assume that each newspaper has its own unique ID, which is that "sn" thing.
                            
                        </p>
                    </div>
                    <div className="right support">
                        <img src="images/scrape_link_labels.svg" />
                    </div>
                </div>
                <div id="read-html">
                    <div className="center text has-hover">
                        <Header as="h3">Reading The Web Page</Header>
                        <p>
                            Websites are written in HTML, and content on websites are contained within
                            HTML tags.  An HTML tag usually consists of an opening tag and a closing tag.
                            For example, the big words "Historical Word Cloud generator" you see at the
                            top of the page is written as:<br/>
                            <code>
                                <Popup
                                    trigger={<span className="can-hover">&lt;h1&gt;</span>}
                                    content="opening tag!"
                                />
                                Historical Word Cloud Generator
                                <Popup
                                    trigger={<span className="can-hover">&lt;/h1&gt;</span>}
                                    content="closing tag!"
                                />
                            </code>.
                        </p>
                        <p>
                            Tags can be nested too.  Take the following example:<br/><br/>
                            <code>
                                &lt;p&gt;<br/>
                                <Popup
                                    trigger={<span className="can-hover">&nbsp;&nbsp;&nbsp;&nbsp;&lt;em&gt;This is emphasized!&lt;em&gt;<br/></span>}
                                    content={<span>This <code>&lt;em&gt;</code> tag is nested inside the <code>&lt;p&gt;</code> around it.</span>}
                                />
                                &lt;/p&gt;
                            </code>
                        </p>
                        <p>
                            So when we have a website whose format is consistent across all
                            the pages that we want to scrape, we can easily find the data
                            from any page by specifying the location of each piece of data.
                            In the above example, we can describe the highlighted part as
                            "the <code>&lt;em&gt;</code> tag inside the <code>&lt;p&gt;</code>
                            tag.  Of course, if the structure of the website changes, we would
                            have to rewrite our scraper or make it smarter.
                        </p>
                        <p>
                            Below is an excerpt from a newpaper on 5/6/1917.  Hover over the
                            text to see how we might describe the location of the data so that
                            the scraper knows where to extract it.
                        </p>
                        <div className="left support has-hover">
                            {this.generateStaticHTML()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ScrapingTab.propTypes = {
    
};

export default ScrapingTab;

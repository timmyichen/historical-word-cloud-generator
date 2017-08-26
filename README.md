# Historical Word Cloud Generator

This is a project developed by Tim Chen at MongoDB, Inc. as part of their Teacher Fellowship Program.  It uses the MERN stack - MongoDB, Express, React, Node.

The application aims to create an educational tool for anyone looking to explore American newspapers from the past. On the surface this application is only a word cloud generator, but users can also load up historical newspapers from the years of 1836 to 1924, archived by the [Library of Congress](http://chroniclingamerica.loc.gov/).

## Demo

The live version can be seen here: [historical-word-cloud.herokuapp.com](https://historical-word-cloud.herokuapp.com)

## Features

### Word Cloud Generation

Using the [d3-cloud] library(https://github.com/jasondavies/d3-cloud) by jasondavies, word clouds can be generated from any text, regardless of context.

### Load Data from Past Newspapers

Using data from the Library of Congress, newspapers from 1836 to 1924 can be accessed by selecting a date.  The application contains a database that holds all previously queried dates.  If the date selected by the user exists in the database, it will load that data and present the user with options.  If the date is unrecognized by the database, it will scrape the relevant data from the Library of Congress, save that data into the database, then proceed normally.  Scraping is done using [cheerio](https://github.com/cheeriojs/cheerio).  Scraping may take up to 30 seconds, as the application implements mild rate limiting.

Since articles on the Library of Congress are read via Optical Character Recognition, many words and characters may be incorrectly recognized (the older the newspaper, the worse it is).  As such, some stop words may not be recognized, or irrelevant words may rise to the top of the word cloud.  The application has an option (enabled by default) to attempt to automatically remove these types of words.

### Computer Science Concepts

Various CS concepts are also given explanations for students who are interested to explore.  Three concepts are covered:

* A simple algorithm for counting words (including an interactive step-by-step demo)
* Web Scraping
* Databases


#!/usr/bin/env python
# Name: Patrick Jonk
# Student number: 10001336
'''
This script scrapes IMDB and outputs a CSV file with highest ranking tv series.
'''
# IF YOU WANT TO TEST YOUR ATTEMPT, RUN THE test-tvscraper.py SCRIPT.
import csv, os

from pattern.web import URL, DOM, plaintext
from pattern.web import NODE, TEXT, COMMENT, ELEMENT, DOCUMENT

# The pattern.web module has a number of convenient search engines

TARGET_URL = "http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series"
BACKUP_HTML = 'tvseries.html'
OUTPUT_CSV = 'tvseries.csv'

# number of series on the webpage
NUMBER_OF_SERIES = 50


def extract_tvseries(dom):
    '''
    Extract a list of highest ranking TV series from DOM (of IMDB page).

    Each TV series entry should contain the following fields:
    - TV Title
    - Ranking
    - Genres (comma separated if more than one)
    - Actors/actresses (comma separated if more than one)
    - Runtime (only a number!)
    '''

    dom = DOM(URL(TARGET_URL).download())

    # global list for storing all series information
    series_list = []

    # collect all info of the series, one series at a time
    for l in range(NUMBER_OF_SERIES):

        # temporary variables to make strings
        genre = ''
        credit = ''

        # get rank for each series
        rank = dom.by_tag("tr.detailed")[l].by_tag("span.value")[0].content

        # get runtime for each series
        time = dom.by_tag("span.runtime")[l]
        time = plaintext(time.content)[:-5]
      
        # get all genres for each series
        for m in dom.by_tag("span.genre")[l].by_tag("a"):
            genre += m.content + ", "
        genre = genre[:-2].encode('ascii', 'ignore').decode('ascii')

        # get all actors for each series
        for m in dom.by_tag("span.credit")[l].by_tag("a"):
            credit += m.content + ", "
        credit = credit[:-2].encode('ascii', 'ignore').decode('ascii')

        # get title for each series
        title = dom.by_tag("tr.detailed")[l].by_tag("a")[1].content

        # store info for each series
        series = [title, rank, genre, credit, time]
        series_list.append(series)

    return series_list

def save_csv(f, tvseries):
    '''
    Output a CSV file containing highest ranking TV-series.
    '''
    # write csv file
    writer = csv.writer(f)
    writer.writerow(['Title', 'Ranking', 'Genre', 'Actors', 'Runtime'])
    writer.writerows(tvseries)
           
if __name__ == '__main__':
    # Download the HTML file
    url = URL(TARGET_URL)
    html = url.download()

    # Save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in testing / grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # Parse the HTML file into a DOM representation
    dom = DOM(html)

    # Extract the tv series (using the function you implemented)
    tvseries = extract_tvseries(dom)

    # Write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'wb') as output_file:
        save_csv(output_file, tvseries)
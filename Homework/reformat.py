# reformat.py
# Patrick Jonk
# 10001336

# This file reformats data to from text csv 

import csv

with open('data.csv', 'wb') as outfile:
        writer = csv.writer(outfile)
        writer.writerow(['date', 'temperature'])

	with open('KNMI_20011101.txt') as f:
		data = f.readlines()[12:]
		for line in data:
			line = line[6:]

			# extract date
			year = line[:4]
			month = line[4:6]
			day = line[6:8]
			date = year + '/' + month +'/' + day

			# extract temperature
			temp = line[11:14].replace(" ", "")

			writer.writerow([date, temp])
			

f.close()
outfile.close()
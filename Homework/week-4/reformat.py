# reformat.py
# Patrick Jonk
# 10001336

# This file reformats data to from text csv 

import json

dates = []
temperatures = []

with open('KNMI_20011101.txt') as f:

	data = f.readlines()[12:]
	datapoints = []

	for line in data:
		line = line[6:]

		# extract date
		year = line[:4]
		month = line[4:6]
		day = line[6:8]
		date = year + '/' + month +'/' + day
		# dates.append(date)

		# extract temperature
		temperature = line[11:14].replace(" ", "")
		temperatures.append(temperature)
		datapoint = [date, temperature]
		datapoints.append(datapoint)

	# data = [dates, temperatures]
f.close()

with open('data.json', 'w') as f:
    json.dump(datapoints, f)
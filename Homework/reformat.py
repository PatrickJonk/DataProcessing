# reformat.py
# Patrick Jonk
# 10001336

import csv


dates = []
temps = []

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

			#writer.writerows([date, temp])
			writer.writerow([date, temp])

f.close()
outfile.close()




       


		
# f.readline()
# f.readline()
# f.readline()
# f.readline()
# f.readline()
# f.readline()
# f.readline()
# f.readline()
# f.readline()
# f.readline()
# f.readline()
# f.readline()

# date = f.readline()
# date = date[6:]
# year = date[:4]
# month = date[4:6]
# day = date[6:8]
# print date[9:]

# print year + '/' + month +'/' + day



	#writer.writerow(date)
	

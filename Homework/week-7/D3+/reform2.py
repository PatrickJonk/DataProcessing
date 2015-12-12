import json

with open('sp.dyn.tfrt.in_Indicator_en_csv_v2.csv') as f:

	
	data = f.readlines()[5:]
	datapoints = []
	
	years = 54

	# year_list = []
	# for i in range(years):
	# 	year_list.append(1960 + i)

	#print year_list

	for line in data:
		split = line.split('"')

		countryName = split[1]
		countryCode = split[3]

		fertilityRate = []
		for i in range(years):
			fertilityRate.append([str(1960 + i), split[(i * 2) + 9]])

		datapoints.append({"countryName": countryName, "countryCode": countryCode, "fertilityRate": fertilityRate})
		#datapoints.append({countryCode : fertilityRate})

f.close()

with open('fertilityRate.json', 'w') as f:
    json.dump(datapoints, f, indent = 4)

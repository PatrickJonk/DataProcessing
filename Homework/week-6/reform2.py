import json

with open('sp.dyn.le00.ma.in_Indicator_en_csv_v2.csv') as f:

	data = f.readlines()[5:]
	datapoints = []

	for line in data:
		split = line.split('"')
		countryCode = split[3]

		age = split[-6]
		if age != '':
			datapoints.append({"country_code": countryCode, "age": age})

		# extract population in 2013 
		# splitLine =  line.split(',')
		# # countryName = splitLine[0].replace('"', '')
  # #       if countryName.leng
		# countryCode = splitLine[1].replace('"', '')
		# age = splitLine[-4].replace('"', '')

		# # converses three char country to two char 	
		# # if countryCode in three:
		# # 	countryCode = two[three.index(countryCode)]

		

f.close()

with open('data3d.json', 'w') as f:
    json.dump(datapoints, f, indent = 4)
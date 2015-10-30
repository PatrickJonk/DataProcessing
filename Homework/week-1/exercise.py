# Name : Patrick Jonk
# Student number : 10001336
'''
This module contains an implementation of split_string.
'''

# You are not allowed to use the standard string.split() function, use of the
# regular expression module, however, is allowed.
# To test your implementation use the test-exercise.py script.


def split_string(source, separators):
	'''
	Split a string <source> on any of the characters in <separators>.

	The ouput of this function should be a list of strings split at the
	positions of each of the separator characters.
	'''
	# temporary variable for storing string
	temp = ''

	# list of string pieces
	strings = []
	
	# 
	for i in range(len(source)):
		test = True

		# check if a charactar is a separator
		for j in range(len(separators)):
			if source[i] == separators[j]:
				test = False

		# add char to string if not a separator
		if test == True:
			temp += source[i]

		# if char is a separator, add it to list and empty temp 
		else:
			if temp != '':
				strings.append(temp)
			temp = ''

	# add last piece to list
	if temp != '':
		strings.append(temp)

	return strings
			


	



			
if __name__ == '__main__':
    # You can try to run your implementation here, that will not affect the
    # automated tests.
    print split_string('abacadabra', 'ba')  # should print: ['c', 'd', 'r']

# print split_string('abacadabra', 'ba')
# split_string('aaabbaaa', 'bc')

import csv
import json

# Specify the CSV file and JSON file names
csv_file = "data.csv"
json_file = "data.json"

# Initialize an empty list to store the data
data_list = []

# Open the CSV file for reading
with open(csv_file, "r") as csvfile:
    # Create a CSV reader object
    csv_reader = csv.DictReader(csvfile)
    
    # Iterate over each row in the CSV file
    for row in csv_reader:
        # Append each row as a dictionary to the data list
        data_list.append(row)

# Open the JSON file for writing
with open(json_file, "w") as jsonfile:
    # Write the data as JSON to the JSON file
    json.dump(data_list, jsonfile, indent=4)

print("CSV to JSON conversion complete.")

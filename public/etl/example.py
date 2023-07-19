import pandas as pd

root_folder = "."

data = pd.read_csv(root_folder + "/input_file.csv")
newData = data[data["age"] > 18]
newData.to_csv(root_folder + "/output_file.csv", index=False)
